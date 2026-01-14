import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Editor Styling
import axios from 'axios';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [content, setContent] = useState('');

  // Editor ke tools (Bold, Image, Link etc.)
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'] // Internal Link aur Image ka option
    ]
  };

  const saveBlog = async () => {
    try {
      // Backend ko data bhejo
      await axios.post('http://localhost:5000/create-blog', {
        title, slug, metaDesc, content
      });
      alert("✅ Blog Post Ho Gaya!");
      // Form saaf kar do
      setTitle(''); setSlug(''); setContent('');
    } catch (error) {
      alert("❌ Error aagya!");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>DSS Admin Dashboard</h1>
      
      {/* Inputs */}
      <input 
        type="text" placeholder="Blog Title" value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      
      <input 
        type="text" placeholder="URL Slug (e.g. seo-tips)" value={slug}
        onChange={e => setSlug(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#f0f0f0' }}
      />

      <textarea 
        placeholder="SEO Meta Description" value={metaDesc}
        onChange={e => setMetaDesc(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      {/* Text Editor */}
      <div style={{ marginBottom: '50px', height: '300px' }}>
        <ReactQuill 
          theme="snow" 
          value={content} 
          onChange={setContent} 
          modules={modules} 
          style={{ height: '100%' }}
        />
      </div>

      <button onClick={saveBlog} style={{ padding: '15px 30px', background: 'blue', color: 'white' }}>
        PUBLISH BLOG
      </button>
    </div>
  );
};

export default AdminPanel;