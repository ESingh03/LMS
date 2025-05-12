import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import "./Login.css";
import { login, verifyJWT  } from "../services/authService";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //for error or messages
  const [message, setMessage] = useState("");
  //For disabling login button
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        await verifyJWT(); // if succeeds, token is valid
        navigate("/Super_Admin_Dashboard");
      } catch {
        // stay on login page
      }
    };
    verifyUser();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    //input empty validation
    if (!username || !password) {
        setMessage("Please enter both username and password.");
        setLoading(false);
        return;
    }
    try{
      //sending request to authservies
      const data = await login(username, password);;
      //localStorage.setItem("departmentName", data.departmentName);

      // ✅ Navigate to the React Dashboard route
      navigate("/Super_Admin_Dashboard");
    } catch (err) {
      setMessage("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Faculty Leave Management</h2>
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <label htmlFor="username" className="login-label">Username</label>
          <input
            id="username"
            type="text"
            className="login-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" className="login-label">Password</label>
          <input
            id="password"
            type="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p className="login-error">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
