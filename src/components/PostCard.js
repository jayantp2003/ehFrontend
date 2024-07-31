import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="post-card">
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <Link to={`/post/${post._id}`} className="btn">
        <i className="fas fa-arrow-right"></i> Read More
      </Link>
    </div>
  );
}

export default PostCard;