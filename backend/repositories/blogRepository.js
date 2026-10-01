import mongoose from 'mongoose';
import { isDbReady } from '../config/db.js';
import { BlogPost, BLOG_STATUSES } from '../models/BlogPost.js';

const memoryPosts = [];

/** Turns a title into a URL-friendly slug; falls back to an id-based slug. */
const slugify = value =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const serialise = doc => (typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc, id: String(doc._id) });

export const blogRepository = {
  async create(data) {
    const slug = data.slug || slugify(data.title) || `post-${Date.now()}`;

    if (isDbReady()) {
      const post = await BlogPost.create({ ...data, slug });
      return serialise(post);
    }

    const record = {
      _id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      excerpt: '',
      category: 'General',
      author: 'Two Plus Transport',
      status: 'Draft',
      publishedAt: '',
      coverImage: '',
      ...data,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryPosts.push(record);
    return { ...record, id: String(record._id) };
  },

  async findById(id) {
    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      const post = await BlogPost.findById(id);
      return post ? serialise(post) : null;
    }
    const found = memoryPosts.find(p => String(p._id) === String(id));
    return found ? { ...found, id: String(found._id) } : null;
  },

  async findAll({ status = null } = {}) {
    const filter = {};
    if (status) filter.status = status;

    if (isDbReady()) {
      const posts = await BlogPost.find(filter).sort({ createdAt: -1 });
      return posts.map(serialise);
    }

    return memoryPosts
      .filter(p => !status || p.status === status)
      .map(p => ({ ...p, id: String(p._id) }));
  },

  async updateById(id, updates) {
    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      const post = await BlogPost.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
      return post ? serialise(post) : null;
    }

    const found = memoryPosts.find(p => String(p._id) === String(id));
    if (!found) return null;
    Object.assign(found, updates, { updatedAt: new Date() });
    return { ...found, id: String(found._id) };
  },

  async deleteById(id) {
    if (isDbReady()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return false;
      const removed = await BlogPost.findByIdAndDelete(id);
      return Boolean(removed);
    }

    const index = memoryPosts.findIndex(p => String(p._id) === String(id));
    if (index === -1) return false;
    memoryPosts.splice(index, 1);
    return true;
  },

  statuses: BLOG_STATUSES,
};

export default blogRepository;
