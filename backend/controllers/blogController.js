import { asyncHandler } from '../middleware/asyncHandler.js';
import { verifyOptional } from '../middleware/auth.js';
import { blogRepository } from '../repositories/blogRepository.js';
import ApiError from '../utils/ApiError.js';

/** The list route is public, so the role is read from req.user when present and from the bearer token otherwise. */
const resolveRole = req => {
  if (req.user?.role) return req.user.role;
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return null;
  return verifyOptional(header.slice(7).trim())?.role ?? null;
};

/** Public callers only ever see published posts; admins may request drafts too. */
const resolveStatus = req => {
  const isAdmin = resolveRole(req) === 'admin';
  const { status, all } = req.query;

  if (status) {
    if (isAdmin) return status;
    return status === 'Published' ? status : 'Published';
  }

  return isAdmin && all === 'true' ? null : 'Published';
};

export const listPosts = asyncHandler(async (req, res) => {
  const status = resolveStatus(req);
  const posts = await blogRepository.findAll({ status });

  res.json({ success: true, count: posts.length, posts });
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, slug, excerpt, content, category, author, status, publishedAt, coverImage } = req.body;

  const post = await blogRepository.create({
    title,
    slug: slug || undefined,
    excerpt: excerpt ?? '',
    content,
    category: category ?? 'General',
    author: author ?? 'Two Plus Transport',
    status: status ?? 'Draft',
    publishedAt: publishedAt ?? '',
    coverImage: coverImage ?? '',
  });

  res.status(201).json({ success: true, post });
});

export const updatePost = asyncHandler(async (req, res) => {
  const allowed = {};
  ['title', 'slug', 'excerpt', 'content', 'category', 'author', 'status', 'publishedAt', 'coverImage'].forEach(key => {
    if (req.body[key] !== undefined) allowed[key] = req.body[key];
  });

  const post = await blogRepository.updateById(req.params.id, allowed);
  if (!post) throw ApiError.notFound('Blog post not found');

  res.json({ success: true, post });
});

export const deletePost = asyncHandler(async (req, res) => {
  const removed = await blogRepository.deleteById(req.params.id);
  if (!removed) throw ApiError.notFound('Blog post not found');

  res.json({ success: true, message: 'Blog post deleted' });
});

export default { listPosts, createPost, updatePost, deletePost };
