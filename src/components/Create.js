import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createPost = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    axios.post('/posts', formData, {
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
      <h1>Create New Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={e => { e.preventDefault(); createPost(); }} className="post-form">
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Content:
          <ReactQuill value={content} onChange={setContent} />
        </label>
        <button type="submit" className="btn">Create</button>
      </form>
    </Layout>
  );
}

export default Create;