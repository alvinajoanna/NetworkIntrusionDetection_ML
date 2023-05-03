import React from 'react';
import Card from './Card';
import Navbar from './Navbar';
import './Dashboard.css';
import Visualization from "./Visualization";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar></Navbar>
      <div className="card-container">
        <Card title="Warnings" detail="23" />
        <Card title="Attacks" detail="11" />
        <Card title="Type" detail="DDoS" />
        <div><Visualization /></div>
        
        
      </div>
    </div >
  );
};

export default Dashboard;






