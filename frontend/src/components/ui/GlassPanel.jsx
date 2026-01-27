import React from 'react';
import { twMerge } from 'tailwind-merge';

const GlassPanel = ({ children, className, ...props }) => {
  return (
    <div 
      className={twMerge(
        'bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
