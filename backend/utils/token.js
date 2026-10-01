import jwt from 'jsonwebtoken';

const getSecret = () => process.env.JWT_SECRET || 'two-plus-transport-dev-secret';

export const signToken = user => {
  const payload = { sub: String(user.id || user._id), email: user.email, role: user.role };
  return jwt.sign(payload, getSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

export const verifyToken = token => jwt.verify(token, getSecret());

export default { signToken, verifyToken };
