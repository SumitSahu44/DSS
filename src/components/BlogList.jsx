import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from './blogData'; // Data import kiya

const BlogList = () => {
  return (
    <div className="bg-[#050505] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 mt-20 border-l-4 border-[#0078f0] pl-6">
          <h2 className="text-3xl font-bold text-white mb-2">Latest Insights</h2>
          <p className="text-gray-400">Click on any card to read the full story.</p>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            // --- LINK WRAPPER (Makes whole card clickable) ---
            <Link 
              to={`/blog/${blog.id}`} 
              key={blog.id} 
              className="group block bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-[#0078f0] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,120,240,0.15)] hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute top-3 right-3 bg-[#ff9f20] text-black text-xs font-bold px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Content Preview */}
              <div className="p-6">
                <div className="flex items-center text-xs text-[#0078f0] mb-3 font-medium">
                  <span>{blog.date}</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span>{blog.author}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-100 mb-3 leading-snug group-hover:text-[#0078f0] transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="mt-4 flex items-center text-sm font-medium text-white group-hover:text-[#ff9f20] transition-colors">
                  Read Full Article &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;