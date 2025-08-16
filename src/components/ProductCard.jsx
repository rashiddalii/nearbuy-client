import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { savedItemsAPI } from '../services/api';
import { toast } from 'react-toastify';

const ProductCard = ({ product, onItemRemoved }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle backend data structure
  const {
    _id: id,
    title,
    description,
    price,
    category,
    images = [],
    seller,
    createdAt,
    views = 0,
    saves = 0,
    averageRating = 0,
    numReviews = 0
  } = product;

  // Check if product is saved on component mount
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const response = await savedItemsAPI.checkIfSaved(id);
        setIsSaved(response.data.isSaved);
      } catch (error) {
        // If user is not authenticated, product is not saved
        setIsSaved(false);
      }
    };

    checkSavedStatus();
  }, [id]);

  // Handle save/unsave
  const handleSaveToggle = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      if (isSaved) {
        await savedItemsAPI.unsaveProduct(id);
        setIsSaved(false);
        toast.success('Product removed from saved items');
        // Call callback if provided (for SavedItems page)
        if (onItemRemoved) {
          onItemRemoved(id);
        }
      } else {
        await savedItemsAPI.saveProduct(id);
        setIsSaved(true);
        toast.success('Product saved successfully');
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      toast.error(error.response?.data?.message || 'Failed to save/unsave product');
    } finally {
      setIsSaving(false);
    }
  };

  // Get first image or use placeholder
  const imageUrl = images.length > 0 
    ? images[0] 
    : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";

  // Format seller name
  const sellerName = seller?.name || "Unknown Seller";

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Price and Seller Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-green-600">
            ${price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            by {sellerName}
          </div>
        </div>

        {/* Rating */}
        {numReviews > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < averageRating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({numReviews})
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>👁️ {views} views</span>
          <span>❤️ {saves} saves</span>
          <span>{formatDate(createdAt)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            to={`/product/${id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors text-center"
          >
            View Details
          </Link>
          <button 
            onClick={handleSaveToggle}
            disabled={isSaving}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              isSaved 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaving ? '...' : isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 