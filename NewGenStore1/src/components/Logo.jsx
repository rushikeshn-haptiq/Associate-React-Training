import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <span className={`text-gray-400 font-bold text-2xl ${className}`}>
      Rushikesh.co
    </span>
  );
};

export default Logo;