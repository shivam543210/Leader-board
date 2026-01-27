import React from 'react';
import { twMerge } from 'tailwind-merge';

const GlassPanel = ({ children, className, ...props }) => {
  return (
    <div 
      className={twMerge(
        'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
