import express from 'express';
import { listPosts, createPost, updatePost, deletePost } from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { blogRules, blogPatchRules } from '../validators/index.js';

const router = express.Router();

router.get('/', listPosts);
router.post('/', protect, authorize('admin'), validate(blogRules), createPost);
router.patch('/:id', protect, authorize('admin'), validate(blogPatchRules), updatePost);
router.delete('/:id', protect, authorize('admin'), deletePost);

export default router;
