import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, noPadding = false, ...props }) => {
  return (
    <div 
      className={twMerge(
        'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm',
        noPadding ? '' : 'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
