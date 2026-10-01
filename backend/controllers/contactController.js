import { asyncHandler } from '../middleware/asyncHandler.js';
import { contactRepository } from '../repositories/contactRepository.js';

export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  await contactRepository.create({
    name,
    email: String(email).toLowerCase(),
    phone: phone ?? '',
    subject,
    message,
  });

  res.status(201).json({ success: true, message: 'Message received' });
});

export const listMessages = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const messages = await contactRepository.findAll({ status: status || null });

  res.json({ success: true, count: messages.length, messages });
});

export default { createMessage, listMessages };
