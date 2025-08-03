import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
    saves = 0
  } = product;

  // Get first image or use placeholder
  // const imageUrl = images.length > 0 
  //   ? images[0] 
  //   : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";

  const imageUrl = images[0];

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
          // onError={(e) => {
          //   e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
          // }}
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
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm font-medium transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 