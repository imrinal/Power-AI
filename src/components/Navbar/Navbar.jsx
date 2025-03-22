import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/Logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const PlanButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("Plan"), 500);
    } else {
      scrollToSection("Plan");
    }
  };

  return <button id="Plan-nav" onClick={handleClick}>Plan Now</button>;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const clientId =
    "940186236550-1v7bf92e24n91lv2ll8pcr80imtce0sb.apps.googleusercontent.com"; // Replace with your actual Client ID

  const handleGoogleLoginSuccess = (response) => {
    const credential = response.credential; // Extract Google JWT Token
    console.log("Login Success:", credential);

    // If needed, send this token to your backend for validation
    fetch("http://localhost:5000/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credential }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Auth Response:", data))
      .catch((err) => console.error("Error verifying token:", err));
  };

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <nav>
        <div className="nav-header">
          <img src={logo} alt="Logo" onClick={() => navigate("/")} />
          <button className="menu-btn" onClick={handleMenuToggle}>
            ☰
          </button>
        </div>
        <ul className={menuOpen ? "nav-open" : ""}>
          <li onClick={() => { navigate("/"); setMenuOpen(false); }}>Home</li>
          <li onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Dashboard</li>
          <li onClick={() => {
            const progressSection = document.getElementById("progress");
            if (progressSection) {
              progressSection.scrollIntoView({ behavior: "smooth" });
            }
            setMenuOpen(false);
          }}>Task Manager</li>

          <PlanButton />

          {/* Google Login Button with Custom Styling */}
          <div className="google-login-container">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.log("Login Failed")}
              theme="outline"
              size="large"
              text="signin_with"
              shape="pill"
            />
          </div>
        </ul>
      </nav>
    </GoogleOAuthProvider>
  );
};

export default Navbar;
