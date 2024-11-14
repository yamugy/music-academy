import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { title: '대시보드', path: '/', className: 'text-emerald-600 hover:text-emerald-800' },
    { title: '학생등록', path: '/student-registration', className: 'text-violet-600 hover:text-violet-800' },
    { title: '학생관리', path: '/student-management', className: 'text-rose-600 hover:text-rose-800' },
    { title: '수업관리', path: '/class-management', className: 'text-cyan-600 hover:text-cyan-800' },
    { title: '결제관리', path: '/payment-management', className: 'text-amber-600 hover:text-amber-800' },
  ];

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40 shadow-lg shadow-gray-100/50">
        <div className="max-w-[1200px] px-6 mx-auto">
          <div className="flex items-center justify-between h-20">
            <Link 
              to="/" 
              className="text-2xl font-bold text-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 scale-150"
            >
              MUSIC ACADEMY
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${item.className} text-lg font-medium transition-all duration-200 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current hover:after:w-full after:transition-all`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden absolute right-4 top-4 p-2"
              onClick={handleToggleMenu}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container px-4 py-3">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 ${item.className} text-lg`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;