import { asyncHandler } from '../middleware/asyncHandler.js';
import { userRepository } from '../repositories/userRepository.js';

export const listUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.findAll();
  res.json({ success: true, count: users.length, users });
});

export default { listUsers };