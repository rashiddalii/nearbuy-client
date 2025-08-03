// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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
  getProfile: () => API.get('/auth/profile'),
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
