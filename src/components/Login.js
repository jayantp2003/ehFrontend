import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_PROXY_URL}/auth/login`, {
        email,
        password
      });
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  return (
    <Layout pageType="login">
      <div className="auth-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;