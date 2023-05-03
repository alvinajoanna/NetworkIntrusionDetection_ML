import React from 'react';
import './Card.css';

const Card = ({ title, detail }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{detail}</div>
    </div>
  );
}

export default Card;
