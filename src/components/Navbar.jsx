import React, { useState, useEffect } from 'react';
import ApiStatus from './ApiStatus';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { chatAPI } from '../services/api';
import socketService from '../services/socket';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    // Disconnect socket on logout
    socketService.disconnect();
    
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Fetch unread message count and setup real-time updates
  useEffect(() => {
    if (token) {
      const fetchUnreadCount = async () => {
        try {
          const res = await chatAPI.getUnreadCount();
          setUnreadCount(res.data.unreadCount);
        } catch (err) {
          console.error('Failed to fetch unread count:', err);
        }
      };
      
      fetchUnreadCount();
      
      // Setup real-time updates for unread count
      const socket = socketService.connect();
      socket.on('receiveMessage', (message) => {
        console.log('New message received in Navbar:', message);
        // Update unread count immediately when new message arrives
        fetchUnreadCount();
      });

      // Listen for read status updates
      socket.on('messagesRead', ({ chatId, messageIds }) => {
        console.log('Messages marked as read in Navbar:', messageIds);
        // Update unread count when messages are read
        fetchUnreadCount();
      });
      
      // Also refresh unread count every 30 seconds as backup
      const interval = setInterval(fetchUnreadCount, 30000);
      
      return () => {
        socket.off('receiveMessage');
        socket.off('messagesRead');
        clearInterval(interval);
      };
    }
  }, [token]);

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to={token ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-bold text-gray-800">NearBuy</span>
            </Link>
            {/* <ApiStatus /> */}
          </div>

          {/* Navigation Links - Show different links based on auth status */}
          <div className="hidden md:flex items-center space-x-8">
            {token ? (
              // Authenticated user navigation
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/my-listings" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/my-listings') 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Listings
                </Link>
                <Link 
                  to="/messages" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive('/messages') 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Messages
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile') 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Profile
                </Link>
              </>
            ) : (
              // Public navigation
              <>
                <Link 
                  to="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/marketplace" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/marketplace') 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Marketplace
                </Link>
                <Link 
                  to="/about" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/about') 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  About
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link
                  to="/add-listing"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  + Add Listing
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
