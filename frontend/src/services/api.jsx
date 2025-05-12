import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/lms/api', // ← Your root API URL
  withCredentials: true, // if you're using cookies
  headers: {
    'Content-Type': 'application/json',
    // Authorization will be added dynamically below if needed
  }
});

// Optional: Add token from localStorage automatically
//api.interceptors.request.use((config) => {
//  const token = localStorage.getItem('token');
//  if (token) {
//    config.headers.Authorization = `Bearer ${token}`;
//  }
//  return config;
//}, (error) => Promise.reject(error));

export default api;
