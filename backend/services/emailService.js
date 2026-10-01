import nodemailer from 'nodemailer';

const COMPANY_NAME = 'Two Plus Transport';
const DISPATCH_EMAIL = process.env.DISPATCH_EMAIL || process.env.SMTP_USER || 'dispatch@twoplustransport.qa';
const PHONE = process.env.COMPANY_PHONE || '+974 5511 0121';
const WHATSAPP = process.env.COMPANY_WHATSAPP || '97471030902';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const C = {
  blue: '#0066FF',
  sky: '#00A3FF',
  navy: '#0B1B33',
  border: '#E2E8F0',
  muted: '#64748B',
  soft: '#F8FAFC',
};

const logoUrl = () => `${CLIENT_URL}/images/logo1-light.png`;

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

/** Table-based shell: renders consistently in Gmail, Outlook and Apple Mail. */
const shell = ({ eyebrow, title, body }) => `
<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#EEF2F7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF2F7;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${C.border};box-shadow:0 8px 24px rgba(15,23,42,0.06);">
          <tr>
            <td style="background:${C.navy};padding:22px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="150" valign="middle">
                    <img src="${logoUrl()}" alt="${COMPANY_NAME}" width="140" style="display:block;width:140px;max-width:100%;height:auto;">
                  </td>
                  <td align="right" valign="middle" style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7DD3FC;font-weight:700;">
                    ${eyebrow}
                  </td>
                </tr>
              </table>
              <h1 style="margin:14px 0 0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:800;">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;font-size:14px;line-height:1.65;color:#1E293B;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px;background:${C.soft};border-top:1px solid ${C.border};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:${C.muted};line-height:1.7;">
                <tr>
                  <td style="padding-bottom:10px;">
                    <strong style="color:${C.navy};">${COMPANY_NAME}</strong> · 24/7 dispatch · Doha, Qatar
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="tel:${PHONE.replace(/\s/g, '')}" style="color:${C.blue};text-decoration:none;font-weight:700;">${PHONE}</a>
                    &nbsp;·&nbsp;
                    <a href="https://wa.me/${WHATSAPP}" style="color:#25D366;text-decoration:none;font-weight:700;">WhatsApp</a>
                    &nbsp;·&nbsp;
                    <a href="mailto:twopluslimo@gmail.com" style="color:${C.blue};text-decoration:none;">twopluslimo@gmail.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const detailRows = booking => [
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
    ([label, value], index) => `
    <tr>
      <td width="38%" style="padding:9px 0;border-bottom:1px solid ${C.border};color:${C.muted};font-size:12px;${index === 0 ? 'font-weight:700;color:' + C.navy + ';' : ''}">${label}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${C.border};font-weight:700;font-size:13px;color:${C.navy};">${value ?? '—'}</td>
    </tr>`,
  )
  .join('');

const detailsTable = booking => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 18px;">
  ${detailRows(booking)}
</table>`;

const notesBlock = booking =>
  booking.specialNotes
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;"><tr>
         <td style="padding:12px 14px;background:${C.soft};border-left:3px solid ${C.blue};border-radius:8px;font-size:13px;">
           <strong>Notes:</strong> ${booking.specialNotes}
         </td>
       </tr></table>`
    : '';

const ctaRow = (label, href) => `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0 0;">
  <tr>
    <td align="center" bgcolor="${C.blue}" style="border-radius:10px;">
      <a href="${href}" style="display:inline-block;padding:13px 26px;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;border-radius:10px;">${label}</a>
    </td>
  </tr>
</table>`;

const trackingBlock = booking => `
<p style="margin:18px 0 0;">
  ${ctaRow('Track this booking', `${CLIENT_URL}/`)}
</p>
<p style="margin:10px 0 0;font-size:12px;color:${C.muted};">
  Enter reference <strong>${booking.trackingId}</strong> in the Track Booking panel to follow your trip live.
</p>`;

const plainDetails = booking =>
  [
    `Booking reference: ${booking.trackingId}`,
    `Service: ${booking.serviceType}`,
    `Customer: ${booking.customerName} · ${booking.customerPhone}`,
    `Pickup: ${booking.pickupLocation}`,
    `Destination: ${booking.dropoffLocation}`,
    `Schedule: ${booking.pickupDate} at ${booking.pickupTime}`,
    `Passengers: ${booking.passengers ?? '—'}`,
    `Vehicle: ${booking.vehicleType || 'To be assigned'}`,
    `Status: ${booking.status}`,
    booking.estimatedPrice ? `Estimated price: QAR ${booking.estimatedPrice}` : null,
    booking.specialNotes ? `Notes: ${booking.specialNotes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

const signature = () =>
  `\n\n${COMPANY_NAME} — 24/7 dispatch\n${PHONE} · WhatsApp ${WHATSAPP}\nTrack a booking: ${CLIENT_URL}/`;

const send = async ({ to, subject, html, text }) => {
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
      text,
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
    const customerHtml = shell({
      eyebrow: 'Booking received',
      title: `We have your request · ${booking.trackingId}`,
      body: `
        <p style="margin:0 0 14px;">Dear <strong>${booking.customerName}</strong>,</p>
        <p style="margin:0 0 18px;">
          Thank you for choosing ${COMPANY_NAME}. Your transport request is logged and our dispatch desk is
          already reviewing vehicle availability. Expect a call within 30 minutes during operating hours.
        </p>
        ${detailsTable(booking)}
        ${notesBlock(booking)}
        <p style="margin:0 0 4px;font-size:13px;color:${C.muted};">What happens next:</p>
        <ol style="margin:0 0 18px;padding-left:20px;font-size:13px;">
          <li>Dispatch verifies vehicle and driver availability</li>
          <li>You receive a confirmation email with the assigned vehicle</li>
          <li>Pickup details are shared on WhatsApp before the trip</li>
        </ol>
        ${trackingBlock(booking)}
        <p style="margin:18px 0 0;font-size:13px;color:${C.muted};">
          Need to change anything? Reply to this email or call ${PHONE}.
        </p>`,
    });

    const dispatchHtml = shell({
      eyebrow: 'Dispatch alert',
      title: `New booking · ${booking.trackingId}`,
      body: `
        <p style="margin:0 0 6px;font-size:15px;font-weight:800;color:${C.navy};">A new booking was placed from the website.</p>
        <p style="margin:0 0 18px;font-size:13px;color:${C.muted};">Confirm it from the admin panel to trigger the customer confirmation email.</p>
        ${detailsTable(booking)}
        ${notesBlock(booking)}
        ${ctaRow('Open admin panel', `${CLIENT_URL}/admin`)}`,
    });

    const [customer, dispatch] = await Promise.all([
      customerRecipient(booking)
        ? send({
            to: booking.customerEmail,
            subject: `Booking received · ${booking.trackingId} · ${COMPANY_NAME}`,
            html: customerHtml,
            text: `Dear ${booking.customerName},\n\nWe have received your booking request.${signature()}\n${plainDetails(booking)}`,
          })
        : Promise.resolve({ sent: false, reason: 'no customer email' }),
      send({
        to: DISPATCH_EMAIL,
        subject: `[New booking] ${booking.trackingId} · ${booking.serviceType} · ${booking.pickupDate} ${booking.pickupTime}`,
        html: dispatchHtml,
        text: `New booking from the website${signature()}\n${plainDetails(booking)}`,
      }),
    ]);

    return { customer, dispatch };
  },

  /** Sent to the customer once dispatch confirms the booking. */
  async sendBookingConfirmed(booking) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    const html = shell({
      eyebrow: 'Booking confirmed',
      title: `Your trip is confirmed · ${booking.trackingId}`,
      body: `
        <p style="margin:0 0 14px;">Dear <strong>${booking.customerName}</strong>,</p>
        <p style="margin:0 0 18px;">
          Good news — your booking is <strong>confirmed</strong>. Vehicle and driver details are shared on WhatsApp
          before pickup, and you can follow the trip status at any time using your reference.
        </p>
        ${detailsTable(booking)}
        ${notesBlock(booking)}
        ${trackingBlock(booking)}`,
    });

    return send({
      to: booking.customerEmail,
      subject: `Booking confirmed · ${booking.trackingId} · ${COMPANY_NAME}`,
      html,
      text: `Dear ${booking.customerName},\n\nYour booking is confirmed.${signature()}\n${plainDetails(booking)}`,
    });
  },

  /** Heads-up when dispatch assigns a driver. */
  async sendDriverAssigned(booking) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    const driver = booking.driverInfo;
    const html = shell({
      eyebrow: 'Driver assigned',
      title: `Driver assigned · ${booking.trackingId}`,
      body: `
        <p style="margin:0 0 14px;">Dear <strong>${booking.customerName}</strong>,</p>
        <p style="margin:0 0 18px;">A driver has been assigned to your trip${driver?.name ? ` — <strong>${driver.name}</strong>` : ''}.</p>
        ${
          driver
            ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;"><tr>
                 <td style="padding:14px;background:${C.soft};border-radius:10px;font-size:13px;">
                   <strong>Driver:</strong> ${driver.name}<br>
                   <strong>Contact:</strong> <a href="tel:${driver.phone}" style="color:${C.blue};">${driver.phone}</a><br>
                   <strong>Vehicle:</strong> ${driver.vehicleNumber}
                 </td>
               </tr></table>`
            : ''
        }
        ${detailsTable(booking)}`,
    });

    return send({
      to: booking.customerEmail,
      subject: `Driver assigned · ${booking.trackingId}`,
      html,
      text: `Dear ${booking.customerName},\n\nA driver has been assigned to your trip.${signature()}\n${plainDetails(booking)}`,
    });
  },

  /** Sent when dispatch completes a trip. */
  async sendBookingCompleted(booking) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    const html = shell({
      eyebrow: 'Trip completed',
      title: `Thank you for travelling with us · ${booking.trackingId}`,
      body: `
        <p style="margin:0 0 14px;">Dear <strong>${booking.customerName}</strong>,</p>
        <p style="margin:0 0 18px;">Your trip is marked complete. Thanks for choosing ${COMPANY_NAME} — we would be glad to serve you again.</p>
        ${detailsTable(booking)}
        <p style="margin:16px 0 0;font-size:13px;color:${C.muted};">
          Share feedback or book a recurring route: <a href="${CLIENT_URL}/" style="color:${C.blue};">twoplustransport.qa</a>
        </p>`,
    });

    return send({
      to: booking.customerEmail,
      subject: `Trip completed · ${booking.trackingId} · Thank you`,
      html,
      text: `Dear ${booking.customerName},\n\nThank you for travelling with ${COMPANY_NAME}.${signature()}\n${plainDetails(booking)}`,
    });
  },

  /** Sent when a booking is cancelled. */
  async sendBookingCancelled(booking, note) {
    if (!customerRecipient(booking)) return { sent: false, reason: 'no customer email' };

    const html = shell({
      eyebrow: 'Booking cancelled',
      title: `Booking cancelled · ${booking.trackingId}`,
      body: `
        <p style="margin:0 0 14px;">Dear <strong>${booking.customerName}</strong>,</p>
        <p style="margin:0 0 18px;">
          Your booking has been cancelled${note ? ` — reason: <strong>${note}</strong>` : ''}.
          We would be happy to rebook you; our dispatch desk is available 24/7.
        </p>
        ${detailsTable(booking)}
        ${ctaRow(`Call ${PHONE}`, `tel:${PHONE.replace(/\s/g, '')}`)}`,
    });

    return send({
      to: booking.customerEmail,
      subject: `Booking cancelled · ${booking.trackingId}`,
      html,
      text: `Dear ${booking.customerName},\n\nYour booking has been cancelled${note ? ` — reason: ${note}` : ''}.${signature()}`,
    });
  },
};

export default emailService;