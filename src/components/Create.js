import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import CustomEditor from './CustomEditor';

function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createPost = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    axios.post('https://ehbackend1.vercel.app/posts', formData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error creating the post!', error);
        setError('Failed to create post. Please try again.');
      });
  };

  return (
    <Layout pageType="create">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Create New Post</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={e => { e.preventDefault(); createPost(); }} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <CustomEditor value={content} onChange={setContent} />
          </div>
          <button type="submit" className="w-full btn">Create Post</button>
        </form>
      </div>
    </Layout>
  );
}

export default Create;