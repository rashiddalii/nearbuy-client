import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, fetch by ID
  const product = {
    id: 1,
    title: "iPhone 13 Pro - Excellent Condition",
    description: "Selling my iPhone 13 Pro in excellent condition. 256GB, Pacific Blue. Comes with original box and charger. This phone has been my daily driver for about a year and has been well taken care of. No scratches on the screen, minor wear on the edges. Battery health is at 92%. Perfect for someone looking for a high-quality iPhone at a great price.",
    price: 799,
    category: "Electronics",
    condition: "Excellent",
    location: "Downtown, City",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop"
    ],
    seller: { 
      name: "John Doe",
      rating: 4.8,
      reviews: 24,
      memberSince: "2023"
    },
    createdAt: "2024-01-15",
    views: 156,
    saved: 12
  };

  const handleContactSeller = () => {
    toast.info('Contact feature coming soon!');
  };

  const handleSaveItem = () => {
    toast.success('Item saved to your favorites!');
  };

  const handleShare = () => {
    navigator.share ? 
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      }) :
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Link copied to clipboard!');
      });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-gray-200">
          <nav className="flex text-sm text-gray-500">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/marketplace" className="hover:text-blue-600">Marketplace</a>
            <span className="mx-2">/</span>
            <a href={`/category/${product.category.toLowerCase()}`} className="hover:text-blue-600">{product.category}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="text-3xl font-bold text-green-600 mb-4">${product.price}</div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>📍 {product.location}</span>
                <span>👁️ {product.views} views</span>
                <span>❤️ {product.saved} saved</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.condition}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {product.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.seller.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>⭐ {product.seller.rating}</span>
                      <span>({product.seller.reviews} reviews)</span>
                      <span>• Member since {product.seller.memberSince}</span>
                    </div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Profile
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleContactSeller}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Contact Seller
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleSaveItem}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Save Item
                </button>
                <button
                  onClick={handleShare}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Share
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Listed:</span> {new Date(product.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Condition:</span> {product.condition}
                </div>
                <div>
                  <span className="font-medium">Category:</span> {product.category}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {product.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Items Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Similar items would go here */}
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <p className="text-gray-500">More items coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 