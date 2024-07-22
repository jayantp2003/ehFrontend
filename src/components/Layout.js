import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader'; // Make sure to create this file

function Layout({ children, pageType, isLoading }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className={`layout ${pageType}-page`}>
      <Loader isLoading={isLoading} />
      <header>
        <nav className={isMenuOpen ? 'nav-open' : ''}>
          <Link to="/" className="logo">
            <i className="fas fa-leaf"></i> GreenBlog
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            {user ? (
              <>
                <Link to="/create" onClick={toggleMenu}>Create Post</Link>
                <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu}>Login</Link>
                <Link to="/register" onClick={toggleMenu}>Register</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container">{children}</main>
      <footer>
        <p>&copy; 2024 GreenBlog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;