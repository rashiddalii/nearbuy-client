import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { savedItemsAPI } from '../services/api';
import { toast } from 'react-toastify';

const SavedItems = () => {
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch saved items
  const fetchSavedItems = async (page = 1) => {
    try {
      setLoading(true);
      const response = await savedItemsAPI.getSavedItems({ page, limit: 12 });
      setSavedItems(response.data.savedItems);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      console.error('Error fetching saved items:', err);
      setError('Failed to load saved items. Please try again.');
      toast.error('Failed to load saved items');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSavedItems();
  }, []);

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchSavedItems(newPage);
  };

  // Handle item removal (when user unsaves an item)
  const handleItemRemoved = (productId) => {
    setSavedItems(prev => prev.filter(item => item._id !== productId));
    setPagination(prev => ({
      ...prev,
      totalItems: prev.totalItems - 1
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Saved Items
            </h1>
            <p className="text-gray-600">
              Your saved products and favorites
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {pagination.totalItems}
          </div>
          <div className="text-gray-600">Saved Items</div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading saved items</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchSavedItems()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Saved Items Grid */}
      {!loading && !error && savedItems.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Saved Items</h2>
            <p className="text-gray-600">
              Showing {savedItems.length} of {pagination.totalItems} items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedItems.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product}
                onItemRemoved={handleItemRemoved}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  pagination.hasPrev
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  pagination.hasNext
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && savedItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved items yet</h3>
            <p className="text-gray-600 mb-6">
              Start saving products you like to see them here later.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Browse Products
              </button>
              <button
                onClick={() => navigate("/add-listing")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Your Own Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedItems;
