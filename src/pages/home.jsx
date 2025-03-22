import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Input from "../components/Inputs/Input";
import Footer from "../components/Footer/Footer";
import "./Home.css";

const Home = ({ setUserData }) => {
  return (
    <div>
      <Navbar />
      <div id="Home">
        <Hero />
      </div>
      <div id="Plan">
        <Input setUserData={setUserData} /> {/* Ensure Input handles this prop properly */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
