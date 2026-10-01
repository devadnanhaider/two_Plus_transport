import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { EmptyState } from '../common/Primitives';
import { Pagination, usePagination } from '../common/Pagination';
import { POST_STATUS_TONE, type Post } from './blogTypes';

interface PostsTableProps {
  posts: Post[];
  onPreview: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export const PostsTable: React.FC<PostsTableProps> = ({ posts, onPreview, onEdit, onDelete }) => {
  const { pageItems, page, pageSize, total, setPage, setPageSize } = usePagination(posts);

  if (total === 0) return <EmptyState label="No articles match your search" />;

  return (
    <div>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
            <th className="px-2 py-3 font-bold">Article</th>
            <th className="px-2 py-3 font-bold">Category</th>
            <th className="px-2 py-3 font-bold">Author</th>
            <th className="px-2 py-3 font-bold">Date</th>
            <th className="px-2 py-3 font-bold">Status</th>
            <th className="px-2 py-3 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map(post => (
            <tr key={post.id} className="border-b border-slate-50 align-top last:border-0">
              <td className="px-2 py-3.5">
                <p className="font-semibold text-slate-800">{post.title}</p>
                <p className="mt-0.5 max-w-md text-[11px] text-slate-500">{post.excerpt}</p>
              </td>
              <td className="px-2 py-3.5 text-slate-600">{post.category}</td>
              <td className="px-2 py-3.5 text-[11px] text-slate-500">{post.author}</td>
              <td className="px-2 py-3.5 text-[11px] text-slate-500">{post.publishedAt}</td>
              <td className="px-2 py-3.5">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${POST_STATUS_TONE[post.status]}`}>
                  {post.status}
                </span>
              </td>
              <td className="px-2 py-3.5">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onPreview(post)}
                    aria-label={`Preview ${post.title}`}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:border-[#0066FF] hover:text-[#0066FF]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onEdit(post)}
                    aria-label={`Edit ${post.title}`}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:border-[#0066FF] hover:text-[#0066FF]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    aria-label={`Delete ${post.title}`}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:border-rose-300 hover:text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        label="articles"
      />
    </div>
  );
};

export default PostsTable;