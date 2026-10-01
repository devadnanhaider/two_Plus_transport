import express from 'express';
import { register, login, me, updateProfile, changePassword, logout, forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import {
  registerRules,
  loginRules,
  changePasswordRules,
  profileRules,
  forgotPasswordRules,
  resetPasswordRules,
} from '../validators/index.js';

const router = express.Router();

router.post('/register', validate(registerRules), register);
router.post('/login', validate(loginRules), login);
router.post('/logout', protect, logout);
router.get('/me', protect, me);
router.patch('/me', protect, validate(profileRules), updateProfile);
router.put('/password', protect, validate(changePasswordRules), changePassword);
router.post('/forgot-password', validate(forgotPasswordRules), forgotPassword);
router.post('/reset-password', validate(resetPasswordRules), resetPassword);

export default router;