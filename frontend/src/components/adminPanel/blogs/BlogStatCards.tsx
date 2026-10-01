import React from 'react';
import { Eye, Newspaper, Pencil } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export interface BlogCounts {
  total: number;
  published: number;
  drafts: number;
}

interface BlogStatCardsProps {
  counts: BlogCounts;
}

export const BlogStatCards: React.FC<BlogStatCardsProps> = ({ counts }) => (
  <div className="grid gap-4 sm:grid-cols-3">
    <StatCard label="All Posts" value={counts.total} icon={Newspaper} />
    <StatCard label="Published" value={counts.published} icon={Eye} tone="emerald" />
    <StatCard label="Drafts" value={counts.drafts} icon={Pencil} tone="amber" />
  </div>
);

export default BlogStatCards;