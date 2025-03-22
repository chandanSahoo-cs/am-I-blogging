import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900">
              BlogWave
            </Link>
          </div>
          
          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <Link
                to="/blog"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isActive("/blog")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Blog
              </Link>
              <Link
                to="/publish"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isActive("/publish")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Publish Your Own
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-blue-600">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/blog"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/blog")
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Blog
          </Link>
          <Link
            to="/publish"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/publish")
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Publish Your Own
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;