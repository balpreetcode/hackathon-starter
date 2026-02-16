import React from 'react';

const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    circle: 'h-12 w-12 rounded-full',
    rect: 'h-32 w-full',
  };

  return (
    <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${variants[variant]} ${className}`}></div>
  );
};

export default Skeleton;
