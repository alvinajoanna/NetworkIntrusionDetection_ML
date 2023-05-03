import React, { useState } from 'react';
import './Navbar.css'; // import css file for styling

const Navbar = (props) => {
  const [navlink,setnavlink] = useState("Main");
  const handleButtonClick = (button) => {
    setnavlink(button);
    props.onbuttonclick(button);
  };
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#" onClick={()=>{handleButtonClick("Main")}}>Dashboard 1</a></li>
        <li><a href="#" onClick={()=>{handleButtonClick("Main2")}}>Dashboard 2</a></li>
        <li><a href="#" onClick={()=>{handleButtonClick("About")}}>About Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
