import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyListings = () => {
  const [listings] = useState([
    {
      id: 1,
      title: "iPhone 13 Pro - Excellent Condition",
      price: 799,
      status: "active",
      views: 45,
      saves: 8,
      createdAt: "2024-01-15",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Vintage Leather Jacket",
      price: 150,
      status: "sold",
      views: 23,
      saves: 3,
      createdAt: "2024-01-10",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    }
  ]);

  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === 'active').length,
    sold: listings.filter(l => l.status === 'sold').length
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600">Manage your product listings</p>
          </div>
          <Link
            to="/add-listing"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            + Add New Listing
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-gray-600">Total Listings</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.sold}</div>
          <div className="text-gray-600">Sold</div>
        </div>
      </div>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">${listing.price}</span>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>👁️ {listing.views} views</span>
                      <span>❤️ {listing.saves} saves</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Listed {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors">
                        Edit
                      </button>
                      <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your first item!</p>
          <Link
            to="/add-listing"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Create Your First Listing
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyListings; 