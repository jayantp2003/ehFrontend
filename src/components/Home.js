import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import PostCard from "./PostCard.js";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://ehbackend1.vercel.app/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts;

  if (loading)
    return (
      <Layout pageType="home">
        <div className="loading">Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout pageType="home">
        <div className="error">{error}</div>
      </Layout>
    );

  return (
    <Layout pageType="home">
      <div className="home-content">
        <h1 className="welcome-title">Welcome to GreenBlog</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        {filteredPosts.length === 0 ? (
          <p className="no-posts">
            No posts found. Try a different search term.
          </p>
        ) : (
          <div className="post-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
