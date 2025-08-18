import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🛍️</span>
              <span className="text-lg font-bold text-gray-800">NearBuy</span>
            </div>
            <p className="text-sm text-gray-600">
              Your local community marketplace. Buy, sell, and connect with neighbors in a safe, trusted environment.
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link to="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link></li>
              <li><Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3">Get in touch</h4>
            <p className="text-sm text-gray-600 mb-3">We’d love to hear your feedback.</p>
            <div className="flex items-center space-x-3 text-xl">
              <a href="#" aria-label="Twitter" className="hover:opacity-80">🐦</a>
              <a href="#" aria-label="Facebook" className="hover:opacity-80">📘</a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80">📸</a>
              <a href="#" aria-label="Email" className="hover:opacity-80">✉️</a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
          <p>© {year} NearBuy. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


