import React from 'react';
import { X } from 'lucide-react';
import type { Post } from './blogTypes';

interface PostPreviewModalProps {
  post: Post;
  onClose: () => void;
}

export const PostPreviewModal: React.FC<PostPreviewModalProps> = ({ post, onClose }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
    <article className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl">
      <button
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
      >
        <X className="h-5 w-5" />
      </button>

      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0066FF]">{post.category}</p>
      <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{post.title}</h3>
      <p className="mt-2 text-xs text-slate-500">
        {post.author} · {post.publishedAt} · {post.readTime}
      </p>
      <p className="mt-5 text-sm font-medium text-slate-600">{post.excerpt}</p>
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">{post.body}</p>
    </article>
  </div>
);

export default PostPreviewModal;