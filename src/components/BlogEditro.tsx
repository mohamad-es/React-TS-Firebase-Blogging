import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log('Title:', title);
    console.log('Content:', content);
    // Save to Firebase or API
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={handleTitleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        className="mb-4"
      />
      <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded">
        Save Blog
      </button>
    </div>
  );
};

export default BlogEditor;
