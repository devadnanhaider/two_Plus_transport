import React from 'react';
import { Loader2, X } from 'lucide-react';
import { ADMIN_FIELD_CLASS, POST_CATEGORIES, type Post, type PostStatus } from './blogTypes';

export type PostDraft = Omit<Post, 'id'> & { id: string };

interface PostFormModalProps {
  draft: PostDraft;
  onChange: (draft: PostDraft) => void;
  onClose: () => void;
  onSave: () => void;
  saving?: boolean;
}

export const PostFormModal: React.FC<PostFormModalProps> = ({ draft, onChange, onClose, onSave, saving }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4">
    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900">{draft.id ? 'Edit post' : 'New post'}</h3>
        <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Title</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.title} onChange={e => onChange({ ...draft, title: e.target.value })} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Excerpt</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.excerpt} onChange={e => onChange({ ...draft, excerpt: e.target.value })} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Body</span>
          <textarea
            rows={5}
            className={ADMIN_FIELD_CLASS}
            value={draft.body}
            onChange={e => onChange({ ...draft, body: e.target.value })}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Category</span>
          <select className={ADMIN_FIELD_CLASS} value={draft.category} onChange={e => onChange({ ...draft, category: e.target.value })}>
            {POST_CATEGORIES.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Author</span>
          <input className={ADMIN_FIELD_CLASS} value={draft.author} onChange={e => onChange({ ...draft, author: e.target.value })} />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Status</span>
          <select
            className={ADMIN_FIELD_CLASS}
            value={draft.status}
            onChange={e => onChange({ ...draft, status: e.target.value as PostStatus })}
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">Publish date</span>
          <input
            type="date"
            className={ADMIN_FIELD_CLASS}
            value={draft.publishedAt}
            onChange={e => onChange({ ...draft, publishedAt: e.target.value })}
          />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!draft.title.trim() || saving}
          className="rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0055FF] px-5 py-2.5 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {saving && <Loader2 className="mr-1.5 inline h-3.5 w-3.5 animate-spin" />}
          {draft.id ? 'Save changes' : 'Create post'}
        </button>
      </div>
    </div>
  </div>
);

export default PostFormModal;