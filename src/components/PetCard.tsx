import React from 'react';
import './PetCard.css';

type PetCardProps = {
  name: string;
  breed: string;
  imageUrl: string;
};

export const PetCard: React.FC<PetCardProps> = ({ name, breed, imageUrl }) => {
  return (
    <div className="pet-card">
      <img src={imageUrl} alt={name} />
      <div className="pet-card-info">
        <h4>{name}</h4>
        <p>{breed}</p>
      </div>
    </div>
  );
};