import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;
