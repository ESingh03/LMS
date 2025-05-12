import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Super_Admin_Dashboard from "./pages/Super_Admin/Super_Admin_Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/Super_Admin_Dashboard"
          element={<PrivateRoute element={<Super_Admin_Dashboard />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
