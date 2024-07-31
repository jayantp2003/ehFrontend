import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';

function Post() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    console.log(userData);

    axios.get(process.env.REACT_APP_PROXY_URL+`/posts/${id}`)
      .then(response => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the post!', error);
        setError('Failed to load post. Please try again.');
      });
  }, [id]);

  const deletePost = () => {
    if (!user) {
      setError('You must be logged in to delete a post.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(process.env.REACT_APP_PROXY_URL+`/posts/${id}`, {
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' }
      })
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
  if (!post) return <Layout pageType="post"><div className="loading">Loading...</div></Layout>;

  const isAuthor = user && post.author === user.email;

  return (
    <Layout pageType="post">
      <article className="post">
        <h1>{post.title}</h1>
        {post.image && <img src={post.image} alt={post.title} className="post-image" />}
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="post-meta">
          <span>Posted on: {new Date(post.createdAt).toLocaleDateString()}</span>
          <span>By: {post.author}</span>
        </div>
        {(isAuthor &&
          <div className="post-actions">
            <Link to={`/edit/${post._id}`} className="btn">
              <i className="fas fa-edit"></i> Edit
            </Link>
            <button onClick={deletePost} className="btn btn-danger">
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        )}
      </article>
    </Layout>
  );
}

export default Post;