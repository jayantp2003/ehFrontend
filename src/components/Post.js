import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';

function Post() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the post!', error);
        setError('Failed to load post. Please try again.');
      });
  }, [id]);

  const deletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(`/posts/${id}`)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('There was an error deleting the post!', error);
          setError('Failed to delete post. Please try again.');
        });
    }
  };

  if (error) return <Layout pageType="post"><div className="error">{error}</div></Layout>;
  if (!post) return <Layout pageType="post"><div>Loading...</div></Layout>;

  return (
    <Layout pageType="post">
      <article className="post">
        <h1>{post.title}</h1>
        {post.image && <img src={post.image} alt={post.title} className="post-image" />}
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="post-actions">
          <Link to={`/edit/${post._id}`} className="btn"><i className="fas fa-edit"></i> Edit</Link>
          <button onClick={deletePost} className="btn btn-danger"><i className="fas fa-trash"></i> Delete</button>
        </div>
      </article>
    </Layout>
  );
}

export default Post;