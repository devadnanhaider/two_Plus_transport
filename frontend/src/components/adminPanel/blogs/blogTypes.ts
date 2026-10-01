export interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  status: 'Draft' | 'Published';
  readTime?: string;
  publishedAt: string;
  coverImage?: string;
  slug?: string;
}

export type PostStatus = Post['status'];

export const POST_CATEGORIES = ['Corporate Fleet', 'School Transport', 'Airport Travel', 'Towing', 'Company News'];

export const POST_STATUS_TONE: Record<PostStatus, string> = {
  Published: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Draft: 'bg-slate-100 text-slate-600 ring-slate-200',
};

export const ADMIN_FIELD_CLASS =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10';