import React from 'react';
import Card from './Card';

const CardList = ({ names }) => {
  return (
    <div className="card-list">
      {names.map((name, index) => (
        <Card key={index} name={name} />
      ))}
    </div>
  );
};

export default CardList;

