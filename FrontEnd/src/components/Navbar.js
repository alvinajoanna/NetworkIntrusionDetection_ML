import React from 'react';
import './Navbar.css'; // import css file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#">Dashboard 1</a></li>
        <li><a href="#">Dashboard 2</a></li>
        <li><a href="#">About Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
