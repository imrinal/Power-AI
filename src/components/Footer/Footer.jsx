import React from "react";
import "./footer.css";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <span>© 2025 Power AI</span>
          <div className="footer-social">
            <a href="https://www.instagram.com/_mrinal.paul_/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/pmrinal12" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/in/mrinalpaul12/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://wa.me/+918918120382" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </div>

          <span>
            Designed & Created by{" "}
            <a href="https://www.linkedin.com/in/mrinalpaul12/" target="_blank" rel="noopener noreferrer">
              Mrinal Paul
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
