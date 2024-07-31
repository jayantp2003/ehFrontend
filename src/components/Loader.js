import React from 'react';

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;