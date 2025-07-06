import React from 'react';
import './PetCard.css';
import { FiEdit } from 'react-icons/fi';

type PetCardProps = {
  name: string;
  breed: string;
  imageUrl: string;
  onEdit?: () => void; 
};

export const PetCard: React.FC<PetCardProps> = ({ name, breed, imageUrl, onEdit }) => {
  return (
    <div className="pet-card">
      <img src={imageUrl} alt={name} />
      <div className="pet-card-info">
        <h4>{name}</h4>
        <p>{breed}</p>
      </div>
      {onEdit && (
        <button 
          className="pet-edit-button"
          onClick={(e) => {
            e.stopPropagation(); 
            onEdit();
          }}
        >
          <FiEdit size={20} color="#FFF" />
        </button>
      )}
    </div>
  );
};