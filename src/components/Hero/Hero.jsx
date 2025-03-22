import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = () => {
    document.getElementById('Plan')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='container'>
      <div className="button">
        <button className='Plan' onClick={scrollToSection}>Plan Now</button>
        <button className='progress' onClick={() => navigate('/dashboard')}>Check Progress</button>
      </div>

      {/* Down Arrow Button */}
      <div className="scroll-down" onClick={scrollToSection}>
        <FaChevronDown />
      </div>
    </div>
  );
};

export default Hero;
