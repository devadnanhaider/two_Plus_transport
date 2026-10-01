import crypto from 'crypto';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authService } from '../services/authService.js';
import { userRepository } from '../repositories/userRepository.js';
import ApiError from '../utils/ApiError.js';

const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;
const FORGOT_PASSWORD_MESSAGE = 'If an account exists for that email, a reset link has been sent.';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, company } = req.body;
  const result = await authService.register({ name, email, password, phone, company });

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token: result.token,
    user: result.user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });

  res.json({
    success: true,
    message: 'Signed in successfully',
    token: result.token,
    user: result.user,
  });
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  res.json({ success: true, user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  res.json({ success: true, message: 'Profile updated', user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.id, { currentPassword, newPassword });
  res.json({ success: true, message: 'Password updated successfully' });
});

export const logout = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Signed out. Please discard your token.' });
});

/** Issues a reset token for known accounts; unknown emails get the same generic reply. */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return res.json({ success: true, message: FORGOT_PASSWORD_MESSAGE });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);
  await userRepository.setResetToken(user.id, token, expiresAt);

  const link = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  console.log(`🔑 Password reset link: ${link}`);

  return res.json({
    success: true,
    message: FORGOT_PASSWORD_MESSAGE,
    ...(process.env.NODE_ENV !== 'production' ? { devResetToken: token } : {}),
  });
});

/** Consumes a valid reset token and replaces the account password. */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const user = await userRepository.findByResetToken(token);
  const expiresAt = user?.resetPasswordExpires ? new Date(user.resetPasswordExpires).getTime() : 0;

  if (!user || !expiresAt || expiresAt < Date.now()) {
    throw ApiError.badRequest('Reset link is invalid or has expired');
  }

  await userRepository.updatePassword(user.id, password);
  await userRepository.setResetToken(user.id, null, null);

  res.json({ success: true, message: 'Password has been reset. You can sign in now.' });
});

export default { register, login, me, updateProfile, changePassword, logout, forgotPassword, resetPassword };
