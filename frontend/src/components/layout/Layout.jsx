import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
