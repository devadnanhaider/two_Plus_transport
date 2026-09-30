import React from 'react';
import { BLOGS_DATA } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-sky-50 text-[#0066FF] border border-sky-200 text-xs font-extrabold uppercase">
            LATEST INSIGHTS & NEWS
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900">Transport & Fleet Blog</h1>
          <p className="text-slate-600 text-sm">Industry updates, fleet safety guides, and Qatar corporate transport trends.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS_DATA.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-semibold">
                    <span className="text-[#0066FF]">{blog.category}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{blog.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{blog.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button className="text-xs font-bold text-[#0066FF] hover:underline flex items-center space-x-1">
                  <span>READ FULL ARTICLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
