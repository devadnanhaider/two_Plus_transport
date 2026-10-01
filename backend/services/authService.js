import { userRepository } from '../repositories/userRepository.js';
import { signToken } from '../utils/token.js';
import ApiError from '../utils/ApiError.js';

const publicShape = user => (typeof user.toPublicJSON === 'function' ? user.toPublicJSON() : user);

export const authService = {
  async register({ name, email, password, phone = '', company = '' }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw ApiError.conflict('An account with this email already exists');

    const created = await userRepository.create({ name, email, password, phone, company });
    const profile = created.public;

    return { user: profile, token: signToken({ id: profile.id, email: profile.email, role: profile.role }) };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw ApiError.unauthorized('Invalid email or password');
    if (user.isActive === false) throw ApiError.forbidden('This account has been deactivated');

    const valid = await user.comparePassword(password);
    if (!valid) throw ApiError.unauthorized('Invalid email or password');

    await user.persist({ lastLoginAt: new Date() });

    return {
      user: publicShape(user),
      token: signToken({ id: user.id, email: user.email, role: user.role }),
    };
  },

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.notFound('Account not found');
    return publicShape(user);
  },

  async updateProfile(userId, updates) {
    const updated = await userRepository.updateById(userId, updates);
    if (!updated) throw ApiError.notFound('Account not found');
    return updated;
  },

  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.notFound('Account not found');

    if (typeof user.comparePassword === 'function') {
      const valid = await user.comparePassword(currentPassword);
      if (!valid) throw ApiError.badRequest('Current password is incorrect');
    }

    await userRepository.updatePassword(userId, newPassword);
    return { updated: true };
  },
};

export default authService;