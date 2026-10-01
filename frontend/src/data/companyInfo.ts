export const COMPANY_INFO = {
  name: 'Two Plus Transport',
  legalName: 'Two Plus Transport',
  email: 'twopluslimo@gmail.com',
  landline: '55110121',
  landlineDisplay: '+974 5511 0121',
  mobile: '71030902',
  mobileDisplay: '+974 71030902',
  whatsapp: '97471030902',
  whatsappDisplay: '+974 71030902',
  address: 'Najma, Doha, Qatar',
  xHandle: '@TwoPlusdoha',
  xUrl: 'https://x.com/TwoPlusdoha',
  whatsappUrl: 'https://wa.me/97471030902?text=Hello%20Two%20Plus%20Transportation%2C%20I%20would%20like%20to%20enquire.',
} as const;

export const CONTACT_LINKS = {
  telLandline: `tel:+${COMPANY_INFO.landline}`,
  telMobile: `tel:+${COMPANY_INFO.mobile}`,
  mailto: `mailto:${COMPANY_INFO.email}`,
  whatsapp: COMPANY_INFO.whatsappUrl,
  x: COMPANY_INFO.xUrl,
} as const;