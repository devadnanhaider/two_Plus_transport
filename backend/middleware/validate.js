/**
 * Minimal schema validator: rules are declared per field and checked before the
 * controller runs. Keeps the API dependency-free while still guarding input.
 *
 * rules: { field: { required, type, min, max, match, enum, oneOf } }
 */
const isEmpty = value => value === undefined || value === null || String(value).trim() === '';

const TYPE_CHECKS = {
  string: value => typeof value === 'string',
  number: value => typeof value === 'number' && Number.isFinite(value),
  boolean: value => typeof value === 'boolean',
  array: value => Array.isArray(value),
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value)),
};

export const validate = rules => (req, res, next) => {
  const errors = [];

  Object.entries(rules).forEach(([field, rule]) => {
    const value = req.body[field];

    if (rule.required && isEmpty(value)) {
      errors.push({ field, message: `${field} is required` });
      return;
    }

    if (isEmpty(value)) return;

    if (rule.type && TYPE_CHECKS[rule.type] && !TYPE_CHECKS[rule.type](value)) {
      errors.push({ field, message: `${field} must be a valid ${rule.type}` });
      return;
    }

    if (rule.min && String(value).length < rule.min) {
      errors.push({ field, message: `${field} must be at least ${rule.min} characters` });
    }

    if (rule.max && String(value).length > rule.max) {
      errors.push({ field, message: `${field} must be at most ${rule.max} characters` });
    }

    if (rule.minimum !== undefined && Number(value) < rule.minimum) {
      errors.push({ field, message: `${field} must be at least ${rule.minimum}` });
    }

    if (rule.maximum !== undefined && Number(value) > rule.maximum) {
      errors.push({ field, message: `${field} must be at most ${rule.maximum}` });
    }

    if (rule.enum && !rule.enum.includes(value)) {
      errors.push({ field, message: `${field} must be one of: ${rule.enum.join(', ')}` });
    }
  });

  if (errors.length > 0) {
    return res.status(422).json({ success: false, message: 'Validation failed', errors });
  }

  return next();
};

export default validate;
