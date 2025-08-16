// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth API functions
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/auth/me', data),
};

// User API functions
export const userAPI = {
  getStats: () => API.get('/users/stats'),
};

// Products API functions
export const productsAPI = {
  // Get all products with filters
  getAll: (params = {}) => API.get('/products', { params }),
  
  // Get single product by ID
  getById: (id) => API.get(`/products/${id}`),
  
  // Create new product
  create: (productData) => API.post('/products', productData),
  
  // Update product
  update: (id, productData) => API.put(`/products/${id}`, productData),
  
  // Delete product
  delete: (id) => API.delete(`/products/${id}`),
  
  // Get user's listings
  getMyListings: () => API.get('/products/user/my-listings'),
  
  // Update product status
  updateStatus: (id, status) => API.patch(`/products/${id}/status`, { status }),
};

// Dashboard API functions
export const dashboardAPI = {
  getDashboard: () => API.get('/dashboard'),
};

export default API;

// Chat API functions
export const chatAPI = {
  // Get or create a chat between current user and another user for a product
  getOrCreate: ({ userId, productId }) => API.post('/chats/get-or-create', { userId, productId }),
  // Get all chats for the logged-in user
  getMyChats: () => API.get('/chats/my'),
  // Get all messages for a chat
  getMessages: (chatId) => API.get(`/messages/${chatId}`),
  // Send a message in a chat
  sendMessage: ({ chatId, text }) => API.post(`/messages/${chatId}`, { text }),
  // Mark messages as read
  markAsRead: (chatId) => API.patch(`/messages/${chatId}/read`),
  // Get unread message count
  getUnreadCount: () => API.get('/messages/unread/count'),
};

// Reviews API functions
export const reviewsAPI = {
  // Get all reviews for a product
  getProductReviews: (productId, params = {}) => API.get(`/reviews/product/${productId}`, { params }),
  
  // Create a new review
  create: (reviewData) => API.post('/reviews', reviewData),
  
  // Update a review
  update: (id, reviewData) => API.put(`/reviews/${id}`, reviewData),
  
  // Delete a review
  delete: (id) => API.delete(`/reviews/${id}`),
  
  // Mark review as helpful/unhelpful
  markHelpful: (id, helpful) => API.post(`/reviews/${id}/helpful`, { helpful }),
};

// Saved Items API functions
export const savedItemsAPI = {
  // Save a product
  saveProduct: (productId) => API.post(`/saved-items/${productId}`),
  
  // Unsave a product
  unsaveProduct: (productId) => API.delete(`/saved-items/${productId}`),
  
  // Get user's saved items
  getSavedItems: (params = {}) => API.get('/saved-items', { params }),
  
  // Check if a product is saved by current user
  checkIfSaved: (productId) => API.get(`/saved-items/check/${productId}`),
  
  // Get saved items count for dashboard
  getSavedItemsCount: () => API.get('/saved-items/count'),
};
