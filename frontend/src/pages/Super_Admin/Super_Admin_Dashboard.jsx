import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Super_Admin_Dashboard() {
    return (
      <div className="dashboard">
        <div className="sidebar">
          <h2>Sidebar</h2>
          <ul>
            <li>Dashboard</li>
            <li>Settings</li>
            <li>Profile</li>
          </ul>
        </div>
  
        <div className="main-content">
          <header>
            <h1>Hello, Welcome to the Dashboard!</h1>
          </header>
          <section className="dashboard-section">
            <p>This is a simple dashboard page.</p>
          </section>
        </div>
      </div>
    );
  }

export default Super_Admin_Dashboard;
