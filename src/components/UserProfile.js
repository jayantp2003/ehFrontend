import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import PostCard from './PostCard';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          console.log('User data:', userData);

          // Fetch user information
          const userResponse = await axios.get(`${process.env.REACT_APP_PROXY_URL}/auth/${userData.id}`, {
            headers: { 'Authorization': `Bearer ${userData.token}` }
          });
          setUser(userResponse.data);
          console.log('User response:', userResponse.data);

          // Fetch user posts
          console.log('User posts:', userResponse.data.posts);
          const postPromises = userResponse.data.posts.map(postId =>
            axios.get(`${process.env.REACT_APP_PROXY_URL}/posts/${postId}`)
          );
          const postResponses = await Promise.all(postPromises);
          const fetchedPosts = postResponses.map(response => response.data);
          console.log('Fetched posts:', fetchedPosts);
          setUserPosts(fetchedPosts);
        }
      } catch (err) {
        console.error('Error fetching user data or posts:', err);
        setError('Failed to load user data or posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Layout pageType="profile">
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout pageType="profile">
        <div className="error-message">{error}</div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout pageType="profile">
        <div className="login-message">Please log in to view your profile.</div>
      </Layout>
    );
  }

  return (
    <Layout pageType="profile">
      <div className="user-profile-container">
        <div className="user-info-card">
          <div className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <h2>{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <p className="user-verification">
            {user.verified ? 
              <span className="verified"><i className="fas fa-check-circle"></i> Verified</span> : 
              <span className="not-verified"><i className="fas fa-times-circle"></i> Not Verified</span>
            }
          </p>
          <Link to="/create" className="btn create-post-btn">Create New Post</Link>
        </div>
        
        <div className="user-posts-section">
          <h3>Your Posts</h3>
          {userPosts.length === 0 ? (
            <p className="no-posts-message">You haven't created any posts yet.</p>
          ) : (
            <div className="post-grid">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserProfile;