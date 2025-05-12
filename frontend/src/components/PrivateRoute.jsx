import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { verifyJWT } from '../services/authService';

const PrivateRoute = ({ element: Component }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await verifyJWT();

        if (res.valid) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    verifyToken();
  }, []);

  if (!authChecked) return <p>Loading...</p>;

  return isAuthenticated ? Component : <Navigate to="/login" replace />;
};

export default PrivateRoute;
