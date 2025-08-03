import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productsAPI } from '../services/api';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === 'active').length,
    sold: listings.filter(l => l.status === 'sold').length,
    draft: listings.filter(l => l.status === 'draft').length
  };

  // Fetch user's listings
  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getMyListings();
      setListings(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load your listings. Please try again.');
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  // Delete listing
  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await productsAPI.delete(listingId);
        setListings(prev => prev.filter(listing => listing._id !== listingId));
        toast.success('Listing deleted successfully');
      } catch (err) {
        console.error('Error deleting listing:', err);
        toast.error('Failed to delete listing');
      }
    }
  };

  // Update listing status
  const handleStatusChange = async (listingId, newStatus) => {
    try {
      await productsAPI.updateStatus(listingId, newStatus);
      setListings(prev => prev.map(listing => 
        listing._id === listingId ? { ...listing, status: newStatus } : listing
      ));
      toast.success(`Listing status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
          <div className="text-gray-600">Drafts</div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your listings...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading listings</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMyListings}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Listings */}
      {!loading && !error && listings.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div key={listing._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={listing.images && listing.images.length > 0 ? listing.images[0] : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
                    }}
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'active' ? 'bg-green-100 text-green-800' : 
                      listing.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                      listing.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">${listing.price}</span>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>👁️ {listing.views || 0} views</span>
                      <span>❤️ {listing.saves || 0} saves</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Listed {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      {/* Status Change Dropdown for Active Listings */}
                      {listing.status === 'active' && (
                        <select
                          value={listing.status}
                          onChange={(e) => handleStatusChange(listing._id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="sold">Mark as Sold</option>
                          <option value="inactive">Deactivate</option>
                        </select>
                      )}
                      
                      <Link
                        to={`/edit-listing/${listing._id}`}
                        className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && listings.length === 0 && (
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