import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import Create from './components/Create';
import Edit from './components/Edit';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/create" element={
        <PrivateRoute>
          <Create />
        </PrivateRoute>
      } />
      <Route path="/edit/:id" element={
        <PrivateRoute>
          <Edit />
        </PrivateRoute>
      } />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
        <PrivateRoute>
          <UserProfile />
        </PrivateRoute>
      } />
    </Routes>
  );
}


export default App;
