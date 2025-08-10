import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productsAPI, chatAPI } from '../services/api';
// import ReviewCard from '../components/ReviewCard';
// import ReviewForm from '../components/ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [reviews, setReviews] = useState([]);
  // const [reviewsLoading, setReviewsLoading] = useState(false);
  // const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch product data
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Product not found or failed to load');
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews for the product
  // const fetchReviews = async () => {
  //   try {
  //     setReviewsLoading(true);
  //     const response = await reviewsAPI.getProductReviews(id);
  //     setReviews(response.data.reviews);
  //   } catch (err) {
  //     console.error('Error fetching reviews:', err);
  //   } finally {
  //     setReviewsLoading(false);
  //   }
  // };

  // Check if current user has already reviewed this product
  // const hasUserReviewed = () => {
  //   if (!currentUser || !reviews.length) return false;
  //   return reviews.some(review => 
  //     review.reviewer._id === currentUser._id || review.reviewer === currentUser._id
  //   );
  // };

  useEffect(() => {
    fetchProduct();
    // fetchReviews(); // Temporarily disabled
    // Get current user info
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    
    console.log('=== USER STATE DEBUG ===');
    console.log('userId from localStorage:', userId);
    console.log('userName from localStorage:', userName);
    console.log('token from localStorage:', token);
    console.log('========================');
    
    if (userId && userName) {
      setCurrentUser({ _id: userId, name: userName });
    }
  }, [id]);

  // Debug: Log user comparison info
  useEffect(() => {
    if (product && currentUser) {
      console.log('=== DEBUG INFO ===');
      console.log('Current User ID:', currentUser._id);
      console.log('Product Seller ID:', product.seller._id);
      console.log('Product Seller ID (string):', product.seller._id.toString());
      console.log('Are they the same?', currentUser._id === product.seller._id.toString());
      console.log('Current User:', currentUser);
      console.log('Product Seller:', product.seller);
      console.log('==================');
    }
  }, [product, currentUser]);



  const handleContactSeller = async () => {
    if (product && product.seller && product.seller._id && product._id) {
      // Check if user is trying to contact themselves
      const currentUserId = localStorage.getItem('userId');
      console.log('Contact Seller - Current User ID:', currentUserId);
      console.log('Contact Seller - Product Seller ID:', product.seller._id.toString());
      
      if (currentUserId === product.seller._id.toString()) {
        toast.error('You cannot contact yourself.');
        return;
      }
      
      try {
        // Call backend to get or create chat
        const res = await chatAPI.getOrCreate({ userId: product.seller._id, productId: product._id });
        const chat = res.data;
        if (chat && chat._id) {
          navigate(`/conversation/${chat._id}`);
        } else {
          toast.error('Failed to open chat.');
        }
      } catch (err) {
        console.error('Chat creation error:', err);
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Failed to open chat.');
        }
      }
    } else {
      toast.error('Seller information not available.');
    }
  };

  const handleSaveItem = () => {
    toast.success('Item saved to your favorites!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: `Check out this ${product?.title} for $${product?.price}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // const handleReviewAdded = (newReview) => {
  //   setReviews(prev => [newReview, ...prev]);
  //   setShowReviewForm(false);
  // };

  // const handleReviewUpdated = (updatedReview) => {
  //   setReviews(prev => prev.map(review => 
  //     review._id === updatedReview._id ? updatedReview : review
  //   ));
  // };

  // const handleReviewDeleted = (reviewId) => {
  //   setReviews(prev => prev.filter(review => review._id !== reviewId));
  // };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h3>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

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
                src={product.images && product.images.length > 0 ? product.images[selectedImage] : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"} 
                alt={product.title} 
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
                }}
              />
            </div>
            {product.images && product.images.length > 1 && (
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
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
                      }}
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
              <div className="text-3xl font-bold text-green-600 mb-4">${product.price.toLocaleString()}</div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>📍 {product.location}</span>
                <span>👁️ {product.views || 0} views</span>
                <span>❤️ {product.saves || 0} saved</span>
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
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                  {product.seller?.name?.charAt(0) || '👤'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{product.seller?.name || 'Unknown Seller'}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < (product.averageRating || 0) ? 'text-yellow-600' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      ({product.numReviews || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Member since {new Date(product.seller?.createdAt || product.createdAt).getFullYear()}
              </p>
            </div>

                         {/* Action Buttons */}
             <div className="space-y-3">
               {/* Debug info */}
               <div className="text-xs text-gray-500 mb-2">
                 Debug: currentUser={currentUser ? 'YES' : 'NO'}, 
                 seller={product.seller._id.toString()}, 
                 user={currentUser?._id}
               </div>
               
               {/* Show Contact Seller button if user is logged in and not the seller */}
               {currentUser && currentUser._id !== product.seller._id.toString() && (
                 <button
                   onClick={handleContactSeller}
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                 >
                   💬 Contact Seller
                 </button>
               )}
               {/* Show Edit button if user is the seller */}
               {currentUser && currentUser._id === product.seller._id.toString() && (
                 <Link
                   to={`/edit-listing/${product._id}`}
                   className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors text-center block"
                 >
                   ✏️ Edit Listing
                 </Link>
               )}
               {/* Show Contact Seller button if user is not logged in */}
               {!currentUser && (
                 <Link
                   to="/login"
                   state={{ from: location }}
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors text-center block"
                 >
                   💬 Contact Seller
                 </Link>
               )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleSaveItem}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  ❤️ Save Item
                </button>
                <button
                  onClick={handleShare}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Additional Info */}
        <div className="px-6 py-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600">Listed:</span>
              <span className="ml-2 text-gray-900">{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Condition:</span>
              <span className="ml-2 text-gray-900">{product.condition}</span>
            </div>
            <div>
              <span className="text-gray-600">Category:</span>
              <span className="ml-2 text-gray-900">{product.category}</span>
            </div>
            <div>
              <span className="text-gray-600">Location:</span>
              <span className="ml-2 text-gray-900">{product.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Temporarily Disabled */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Reviews Coming Soon!</h3>
          <p className="text-gray-600 mb-6">The review system is being updated and will be back soon.</p>
        </div>
      </div>

      {/* Similar Items Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-gray-500">More items coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 