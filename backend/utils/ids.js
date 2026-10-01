const randomDigits = (length = 6) => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

export const generateTrackingId = (prefix = 'TPT') => `${prefix}-${randomDigits(6)}`;

export const generateReference = (prefix = 'REF') => `${prefix}-${randomDigits(8)}`;

export default { generateTrackingId, generateReference };
