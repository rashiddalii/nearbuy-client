// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsAPI, dashboardAPI } from '../services/api';
import { toast } from 'react-toastify';


const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userStats, setUserStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalSaves: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = ["all", "Electronics", "Fashion", "Sports", "Furniture", "Books", "Music", "Home & Garden", "Toys", "Automotive", "Other"];

  // Fetch all products for dashboard (marketplace view)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm || undefined,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        sort: sortBy,
        limit: 12
      };

      const response = await productsAPI.getAll(params);
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user stats
  const fetchUserStats = async () => {
    try {
      const response = await productsAPI.getMyListings();
      const userProducts = response.data;
      
      const stats = {
        totalListings: userProducts.length,
        activeListings: userProducts.filter(p => p.status === 'active').length,
        totalViews: userProducts.reduce((sum, p) => sum + (p.views || 0), 0),
        totalSaves: userProducts.reduce((sum, p) => sum + (p.saves || 0), 0)
      };
      
      setUserStats(stats);
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchProducts();
    fetchUserStats();
  }, [searchTerm, selectedCategory, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening in your marketplace.
            </p>
          </div>
          <button
            onClick={() => navigate("/add-listing")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            + Add Listing
          </button>
        </div>
      </div>



      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{userStats.totalListings}</div>
          <div className="text-gray-600">My Listings</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{userStats.activeListings}</div>
          <div className="text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">{userStats.totalViews}</div>
          <div className="text-gray-600">Total Views</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-red-600">{userStats.totalSaves}</div>
          <div className="text-gray-600">Total Saves</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/my-listings")}
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors text-left"
          >
            <div className="text-blue-600 text-2xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900">My Listings</h3>
            <p className="text-sm text-gray-600">Manage your products</p>
          </button>
          <button
            onClick={() => navigate("/add-listing")}
            className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors text-left"
          >
            <div className="text-green-600 text-2xl mb-2">➕</div>
            <h3 className="font-semibold text-gray-900">Add New Listing</h3>
            <p className="text-sm text-gray-600">Create a new product</p>
          </button>
          <button
            onClick={() => navigate("/messages")}
            className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors text-left"
          >
            <div className="text-purple-600 text-2xl mb-2">💬</div>
            <h3 className="font-semibold text-gray-900">Messages</h3>
            <p className="text-sm text-gray-600">View conversations</p>
          </button>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Listings</h2>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `Showing ${products.length} products`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
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
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 rounded-lg p-6 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading products</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => fetchProducts()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => navigate("/add-listing")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Be the First to List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
