import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com/api' 
    : 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  verifyToken: () => api.post('/auth/verify-token'),
  logout: () => api.post('/auth/logout'),
};

// Posts API
export const postsAPI = {
  // Public endpoints
  getPosts: (params = {}) => api.get('/posts', { params }),
  getPost: (slug) => api.get(`/posts/${slug}`),
  getTrendingPosts: (limit = 5) => api.get('/posts/trending', { params: { limit } }),
  getTags: () => api.get('/posts/tags'),
  likePost: (id) => api.post(`/posts/${id}/like`),
  
  // Admin endpoints
  getAdminPosts: (params = {}) => api.get('/posts/admin', { params }),
  createPost: (postData) => api.post('/posts', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/posts/${id}`),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get('/categories'),
  getCategoriesWithCounts: () => api.get('/categories/with-counts'),
  getCategory: (slug) => api.get(`/categories/${slug}`),
  getCategoryPosts: (slug, params = {}) => api.get(`/categories/${slug}/posts`, { params }),
  
  // Admin endpoints
  getAdminCategories: () => api.get('/categories/admin'),
  createCategory: (categoryData) => api.post('/categories', categoryData),
  updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
  updateCategoryCounts: (id) => api.put(`/categories/${id}/update-counts`),
};

// Upload API
export const uploadAPI = {
  uploadPostImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/post-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadPostImages: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post('/upload/post-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteFile: (type, filename) => api.delete(`/upload/${type}/${filename}`),
  getFiles: (type, params = {}) => api.get(`/upload/files/${type}`, { params }),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;

