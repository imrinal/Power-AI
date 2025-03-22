import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Progress from "../components/Progress/Progress";
import Footer from "../components/Footer/Footer";
import "./Dashboard.css";

const Dashboard = ({ userData }) => {
  return (
    <div>
      <Navbar />
      <Progress userData={userData} />
      <Footer />
    </div>
  );
};

export default Dashboard;