import mongoose from 'mongoose';

export const BLOG_STATUSES = ['Draft', 'Published'];

/** Rewrites `_id` as a plain `id` so API payloads match the rest of the endpoints. */
const transform = (_doc, ret) => {
  ret.id = String(ret._id);
  delete ret._id;
  delete ret.__v;
  return ret;
};

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 200 },
    slug: { type: String, trim: true, lowercase: true, index: true, unique: true, sparse: true },
    excerpt: { type: String, default: '', trim: true, maxlength: 500 },
    content: { type: String, required: [true, 'Content is required'] },
    category: { type: String, default: 'General', trim: true },
    author: { type: String, default: 'Two Plus Transport', trim: true },
    status: { type: String, enum: BLOG_STATUSES, default: 'Draft' },
    publishedAt: { type: String, default: '' },
    coverImage: { type: String, default: '', trim: true },
  },
  { timestamps: true, toJSON: { transform } },
);

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
