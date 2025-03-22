import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import "./app.css";

function App() {
  const [userData, setUserData] = useState({ diet: "", workout: "", roadmap: "", name: "" });

  // Retrieve user data from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home setUserData={setUserData} />} />
          <Route path="/dashboard" element={<Dashboard userData={userData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
