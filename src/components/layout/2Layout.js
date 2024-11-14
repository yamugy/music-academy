import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50">
      <Navbar />
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;