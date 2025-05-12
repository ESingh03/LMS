import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data; 
  } catch (err) {
    // Better error handling: fallback if `err.response` is undefined
    const message = err.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

//verify JWT Token
export const verifyJWT = async () => {
  const response = await api.get('/verify-token'); // endpoint that checks token validity
  return response.data;
};

