import React from 'react';
import './CardSection.css';
import Card from './Card';
import './MainPage.css';


const CardSection = ({ title, names }) => {
  return (
    <div className="card-section">
      <h2 className="section-title">{title}</h2>
      <div className="card-list">
        {names.map((name, index) => (
          <Card key={index} name={name} />
        ))}
      </div>
    </div>
  );
};

export default CardSection;
