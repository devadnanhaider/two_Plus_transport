import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, RefreshCw, Search } from 'lucide-react';
import api, { extractError } from '../../lib/apiClient';
import { useAdminMeta } from '../../components/adminPanel/layout/Layout';
import { Panel, Spinner, ErrorNote, EmptyState } from '../../components/adminPanel/common/Primitives';
import { BlogStatCards, type BlogCounts } from '../../components/adminPanel/blogs/BlogStatCards';
import { PostsTable } from '../../components/adminPanel/blogs/PostsTable';
import { PostFormModal, type PostDraft } from '../../components/adminPanel/blogs/PostFormModal';
import { PostPreviewModal } from '../../components/adminPanel/blogs/PostPreviewModal';
import { POST_CATEGORIES, type Post } from '../../components/adminPanel/blogs/blogTypes';
import { useToast } from '../../components/common/ToastProvider';

const EMPTY_DRAFT: PostDraft = {
  id: '',
  title: '',
  excerpt: '',
  body: '',
  category: POST_CATEGORIES[0],
  author: 'Dispatch Team',
  status: 'Draft',
  readTime: '4 min read',
  publishedAt: new Date().toISOString().slice(0, 10),
};

const fromApi = (record: {
  _id?: string;
  id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  body?: string;
  category?: string;
  author?: string;
  status: string;
  publishedAt?: string;
  coverImage?: string;
  slug?: string;
}): Post => ({
  id: record.id || record._id || '',
  title: record.title,
  excerpt: record.excerpt || '',
  body: record.content || record.body || '',
  category: record.category || POST_CATEGORIES[0],
  author: record.author || 'Two Plus Transport',
  status: record.status === 'Published' ? 'Published' : 'Draft',
  publishedAt: record.publishedAt || '',
  coverImage: record.coverImage,
  slug: record.slug,
});

export const BlogsPage: React.FC = () => {
  const toast = useToast();
  useAdminMeta({ title: 'Blog', subtitle: 'Create, edit and publish articles' });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<PostDraft>(EMPTY_DRAFT);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Post | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ posts: (Parameters<typeof fromApi>[0])[] }>('/blogs?all=true');
      setPosts((res.data.posts || []).map(fromApi));
    } catch (err) {
      setError(extractError(err, 'Could not load articles'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter(post =>
      [post.title, post.excerpt, post.category, post.author].join(' ').toLowerCase().includes(needle),
    );
  }, [posts, query]);

  const counts: BlogCounts = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter(p => p.status === 'Published').length,
      drafts: posts.filter(p => p.status === 'Draft').length,
    }),
    [posts],
  );

  const save = async () => {
    setSaving(true);
    setError(null);

    const payload = {
      title: draft.title.trim(),
      excerpt: draft.excerpt.trim(),
      content: draft.body.trim(),
      category: draft.category,
      author: draft.author.trim() || 'Two Plus Transport',
      status: draft.status,
      publishedAt: draft.publishedAt,
    };

    try {
      if (draft.id) {
        await api.patch(`/blogs/${draft.id}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      setEditing(false);
      toast.success(draft.id ? 'Article updated' : 'Article created', payload.title);
      await load();
    } catch (err) {
      const message = extractError(err, 'Could not save this article');
      setError(message);
      toast.error('Save failed', message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    setError(null);
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Article deleted');
      await load();
    } catch (err) {
      const message = extractError(err, 'Could not delete this article');
      setError(message);
      toast.error('Delete failed', message);
    }
  };

  return (
    <div className="space-y-6">
      <BlogStatCards counts={counts} />

      <Panel
        title="Articles"
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search articles…"
                className="w-40 bg-transparent text-xs outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              onClick={load}
              aria-label="Refresh articles"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-[#0066FF] hover:text-[#0066FF]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => {
                setDraft(EMPTY_DRAFT);
                setEditing(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0066FF] px-3.5 py-2 text-[11px] font-bold text-white transition hover:bg-[#0052CC]"
            >
              <Plus className="h-3.5 w-3.5" />
              New post
            </button>
          </div>
        }
      >
        {loading && <Spinner label="Loading articles…" />}
        {!loading && error && posts.length === 0 && <ErrorNote message={error} onRetry={load} />}
        {!loading && error && posts.length > 0 && (
          <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700">
            {error}
          </p>
        )}
        {!loading && !error && posts.length === 0 && <EmptyState label="No articles yet — write your first post" />}
        {!loading && posts.length > 0 && (
          <PostsTable
            posts={filtered}
            onPreview={setPreview}
            onEdit={post => {
              setDraft({ ...post });
              setEditing(true);
            }}
            onDelete={remove}
          />
        )}
      </Panel>

      {editing && (
        <PostFormModal
          draft={draft}
          onChange={setDraft}
          onClose={() => setEditing(false)}
          onSave={save}
          saving={saving}
        />
      )}
      {preview && <PostPreviewModal post={preview} onClose={() => setPreview(null)} />}
    </div>
  );
};

export default BlogsPage;