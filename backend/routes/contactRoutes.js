import express from 'express';
import { createMessage, listMessages } from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { contactRules } from '../validators/index.js';

const router = express.Router();

router.post('/', validate(contactRules), createMessage);
router.get('/', protect, authorize('admin'), listMessages);

export default router;
