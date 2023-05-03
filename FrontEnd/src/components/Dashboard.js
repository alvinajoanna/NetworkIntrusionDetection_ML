import React, { useState } from 'react';
import Card from './Card';
import Navbar from './Navbar';
import './Dashboard.css';
import Visualization from "./Visualization";

const Dashboard = () => {
  const [currentpage, setcurrentpage] = useState("main");


  return (
    <div className="dashboard">
      <Navbar onbuttonclick={setcurrentpage}></Navbar>
      {currentpage == "Main" &&
        <div className="card-container">
          <div className="card-container">
            <Card title="Warnings" detail="23" />
            <Card title="Attacks" detail="11" />
            <Card title="Type" detail="DDoS" />
            {/* <div><Visualization /></div> */}
          </div>
          <div className="card-container-bottom">
            <Card title="Visualization" detail="Maybe Bar Chart" />
            <Card title="Visualization" detail="Maybe Line Graph" />

            {/* <div><Visualization /></div> */}
          </div>
        </div>
      }
      {currentpage == "Main2" &&
        <div>
          Yobah's DashBoard
          
        </div>
      }

      {currentpage == "About" &&
        <div className="card-container">
          <div className="card-container">
           About Us
          </div>
          
        </div>
      }


    </div >
  );
};

export default Dashboard;






