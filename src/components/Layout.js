import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Layout({ children, pageType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`layout ${pageType}-page`}>
      <header>
        <nav className={isMenuOpen ? 'nav-open' : ''}>
          <Link to="/" className="logo">
            <i className="fas fa-leaf"></i> GreenBlog
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            <Link to="/" onClick={toggleMenu}>Home</Link>
            <Link to="/create" onClick={toggleMenu}>Create Post</Link>
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