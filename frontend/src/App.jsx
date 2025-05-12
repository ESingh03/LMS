import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Super_Admin_Dashboard from "./pages/Super_Admin/Super_Admin_Dashboard";
import ModifyDepartments from './pages/Super_Admin/ModifyDepartments'; 
import PrivateRoute from "./components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyDesignations from "./pages/Super_Admin/ModifyDesignations";


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
         <Route path="/modify-department" element={<PrivateRoute element={<ModifyDepartments />} />}/>
         <Route path="/modify-designation" element={<PrivateRoute element={<ModifyDesignations />} />}/>

      </Routes>
    </Router>
  );
};

export default App;
