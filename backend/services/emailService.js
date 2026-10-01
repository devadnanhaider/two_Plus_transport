import nodemailer from 'nodemailer';

const COMPANY_NAME = 'Two Plus Transport';
const DISPATCH_EMAIL = process.env.DISPATCH_EMAIL || process.env.SMTP_USER || 'dispatch@twoplustransport.qa';
const BRAND = {
  blue: '#0066FF',
  sky: '#00A3FF',
  slate: '#0B1B33',
  border: '#E2E8F0',
  muted: '#64748B',
};

let transporter = null;

const isConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const getTransporter = () => {
  if (!isConfigured()) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
};

const shell = (title, inner) => `
<div style="margin:0;padding:24px;background:#F1F5F9;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.slate};">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,${BRAND.sky},${BRAND.blue});padding:20px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#DBEAFE;font-weight:700;">${COMPANY_NAME}</p>
      <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;">${title}</h1>
    </div>
    <div style="padding:24px;font-size:14px;line-height:1.6;">
      ${inner}
    </div>
    <div style="padding:16px 24px;border-top:1px solid ${BRAND.border};font-size:12px;color:${BRAND.muted};">
      <p style="margin:0;">${COMPANY_NAME} · 24/7 dispatch · Doha, Qatar</p>
    </div>
  </div>
</div>`;

const rows = booking => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 16px;">
  ${[
    ['Booking reference', booking.trackingId],
    ['Service', booking.serviceType],
    ['Customer', `${booking.customerName} · ${booking.customerPhone}`],
    ['Pickup', booking.pickupLocation],
    ['Destination', booking.dropoffLocation],
    ['Schedule', `${booking.pickupDate} at ${booking.pickupTime}`],
    ['Passengers', booking.passengers ?? '—'],
    ['Vehicle', booking.vehicleType || 'To be assigned'],
    ['Status', booking.status],
    booking.estimatedPrice ? ['Estimated price', `QAR ${booking.estimatedPrice}`] : null,
  ]
    .filter(Boolean)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:12px;width:40%;">${label}</td>
        <td style="padding:8px 0;border-bottom:1px solid ${BRAND.border};font-weight:700;font-size:13px;">${value ?? '—'}</td>
      </tr>`,
    )
    .join('')}
</table>`;

const notes = booking =>
  booking.specialNotes
    ? `<p style="margin:0 0 12px;padding:12px 14px;background:#F8FAFC;border-left:3px solid ${BRAND.blue};border-radius:8px;font-size:13px;"><strong>Notes:</strong> ${booking.specialNotes}</p>`
    : '';

const trackLink = booking => {
  const base = process.env.CLIENT_URL || 'http://localhost:5173';
  return `<p style="margin:16px 0 0;">
    <a href="${base}/" style="display:inline-block;padding:11px 20px;background:linear-gradient(90deg,${BRAND.sky},${BRAND.blue});color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:13px;">Track this booking</a>
  </p>
  <p style="margin:10px 0 0;font-size:12px;color:${BRAND.muted};">Use reference <strong>${booking.trackingId}</strong> on the Track Booking panel.</p>`;
};

const send = async ({ to, subject, html }) => {
  const agent = getTransporter();

  if (!agent) {
    console.log(`📧 [email disabled] to=${to} subject="${subject}"`);
    return { sent: false, reason: 'SMTP not configured' };
  }

  try {
    await agent.sendMail({
      from: process.env.SMTP_FROM || `"${COMPANY_NAME}" <${DISPATCH_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log(`📧 Sent "${subject}" to ${to}`);
    return { sent: true };
  } catch (error) {
    console.error('📧 Email failed:', error.message);
    return { sent: false, reason: error.message };
  }
};

const customerRecipient = booking =>
  booking.customerEmail && !booking.customerEmail.startsWith('not-provided@') ? booking.customerEmail : null;

export const emailService = {
  /** Sent the moment a booking lands: customer acknowledgement + dispatch alert. */
  async sendBookingReceived(booking) {
    const customerHtml = shell(
      `Booking received · ${booking.trackingId}`,
      `<p style="margin:0 0 16px;">Dear <strong>${booking.customerName}</strong>,</p>
       <p style="margin:0 0 16px;">Thank you for booking with ${COMPANY_NAME}. We have received your request and our dispatch team will call you shortly to confirm the vehicle and driver.</p>
       ${rows(booking)}
       ${notes(booking)}
       ${trackLink(booking)}`,
    );

    const dispatchHtml = shell(
      `New booking · ${booking.trackingId}`,
      `<p style="margin:0 0 16px;">A new booking was placed from the website.</p>
       ${rows(booking)}
       ${notes(booking)}`,
    );

    const [customer, dispatch] = await Promise.all([
      customerRecipient(booking)
        ? send({ to: booking.customerEmail, subject: `Your ${COMPANY_NAME} booking ${booking.trackingId}`, html: customerHtml })
        : Promise.resolve({ sent: false, reason: 'no customer email' }),
      send({ to: DISPATCH_EMAIL, subject: `[New booking] ${booking.trackingId} · ${booking.serviceType}`, html: dispatchHtml }),
    ]);

    return { customer, dispatch };
  },

  /** Sent to the customer once dispatch confirms the booking. */
  async sendBookingConfirmed(booking) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    return send({
      to: booking.customerEmail,
      subject: `Booking confirmed · ${booking.trackingId} · ${COMPANY_NAME}`,
      html: shell(
        `Booking confirmed · ${booking.trackingId}`,
        `<p style="margin:0 0 16px;">Dear <strong>${booking.customerName}</strong>,</p>
         <p style="margin:0 0 16px;">Your booking is <strong>confirmed</strong>. Our team will share driver and vehicle details before pickup.</p>
         ${rows(booking)}
         ${notes(booking)}
         ${trackLink(booking)}`,
      ),
    });
  },

  /** Optional heads-up when dispatch assigns a driver. */
  async sendDriverAssigned(booking) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    return send({
      to: booking.customerEmail,
      subject: `Driver assigned · ${booking.trackingId}`,
      html: shell(
        `Driver assigned · ${booking.trackingId}`,
        `<p style="margin:0 0 16px;">Dear <strong>${booking.customerName}</strong>,</p>
         <p style="margin:0 0 16px;">A driver has been assigned to your trip${booking.driverInfo?.name ? ` — <strong>${booking.driverInfo.name}</strong>` : ''}.</p>
         ${rows(booking)}`,
      ),
    });
  },

  /** Sent when dispatch completes a trip. */
  async sendBookingCompleted(booking) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    return send({
      to: booking.customerEmail,
      subject: `Trip completed · ${booking.trackingId}`,
      html: shell(
        `Trip completed · ${booking.trackingId}`,
        `<p style="margin:0 0 16px;">Dear <strong>${booking.customerName}</strong>,</p>
         <p style="margin:0 0 16px;">Thank you for choosing ${COMPANY_NAME}. We hope the journey went well.</p>
         ${rows(booking)}`,
      ),
    });
  },

  /** Sent when a booking is cancelled. */
  async sendBookingCancelled(booking, note) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    return send({
      to: booking.customerEmail,
      subject: `Booking cancelled · ${booking.trackingId}`,
      html: shell(
        `Booking cancelled · ${booking.trackingId}`,
        `<p style="margin:0 0 16px;">Dear <strong>${booking.customerName}</strong>,</p>
         <p style="margin:0 0 16px;">Your booking has been cancelled.${note ? ` Reason: ${note}.` : ''} Please contact 24/7 dispatch if you need help rebooking.</p>
         ${rows(booking)}`,
      ),
    });
  },
};

export default emailService;