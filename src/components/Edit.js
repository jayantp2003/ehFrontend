import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Edit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('There was an error fetching the post!', error);
        setError('Failed to load post. Please try again.');
      });
  }, [id]);


  const updatePost = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    axios.put(`/posts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        navigate(`/post/${id}`);
      })
      .catch(error => {
        console.error('There was an error updating the post!', error);
        setError('Failed to update post. Please try again.');
      });
  };

  return (
    <Layout pageType="edit">
      <h1>Edit Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={e => { e.preventDefault(); updatePost(); }} className="post-form">
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Content:
          <ReactQuill value={content} onChange={setContent} />
        </label>
        <button type="submit" className="btn">Update</button>
      </form>
    </Layout>
  );
}

export default Edit;