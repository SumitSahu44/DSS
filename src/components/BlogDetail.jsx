import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from './blogData'; 

const BlogDetail = () => {
  const { id } = useParams(); 
  const blog = blogs.find((b) => b.id === parseInt(id)); 

  if (!blog) {
    return <div className="text-white text-center py-20 bg-[#050505] min-h-screen">Blog not found!</div>;
  }

  return (
    <div className="bg-[#050505] min-h-screen mt-20 pb-24 pt-24">
      
      {/* Container */}
      <article className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <Link to="/blogs" className="inline-flex items-center text-gray-400 hover:text-[#0078f0] transition-colors mb-10 text-sm font-medium group">
          <span className="group-hover:-translate-x-1 transition-transform mr-2">&larr;</span> Back to all blogs
        </Link>

        {/* Category & Date */}
        <div className="flex items-center gap-4 text-sm font-semibold mb-6">
          <span className="bg-[#ff9f20]/10 text-[#ff9f20] px-3 py-1 rounded-full uppercase tracking-wider text-xs border border-[#ff9f20]/20">
            {blog.category}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400">{blog.date}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Hero Image */}
        <div className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] relative group">
           {/* Image Overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between border-y border-white/10 py-6 mb-12 bg-white/5 rounded-xl px-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0078f0] to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="text-white font-bold text-base">Written by {blog.author}</p>
              <p className="text-[#0078f0] text-xs font-medium uppercase tracking-wide">SEO Expert</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <i className="fas fa-share-alt"></i> Share
          </button>
        </div>

        {/* --- ACTUAL BLOG CONTENT RENDERER --- */}
        {/* Is div ke andar hum 'dangerouslySetInnerHTML' use kar rahe hain.
            Styling ke liye maine 'blog-content' class banayi hai (CSS neeche dekhein).
        */}
        <div 
            className="blog-content text-gray-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
        />

      </article>

      {/* Internal CSS for Blog Content Styling */}
      <style>{`
        /* Headings inside the blog content */
        .blog-content h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        /* Paragraphs */
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #d1d5db; /* Gray-300 */
        }
        
        /* Intro Text styling */
        .blog-content .intro-text {
            font-size: 1.25rem;
            color: #ffffff;
            font-weight: 300;
            border-left: 4px solid #0078f0;
            padding-left: 1.5rem;
            margin-bottom: 2.5rem;
        }

        /* Bold text highlight */
        .blog-content strong {
            color: #ff9f20; /* Orange highlight */
        }

        /* CTA Box Styling */
        .cta-box {
            background: linear-gradient(135deg, #0B1C3E 0%, #000 100%);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            margin-top: 4rem;
        }
        .cta-box p {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .cta-link {
            display: inline-block;
            background-color: #0078f0;
            color: white;
            padding: 12px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }
        .cta-link:hover {
            background-color: #ff9f20;
            color: black;
            transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;