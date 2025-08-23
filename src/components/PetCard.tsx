import React from 'react';
import './PetCard.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

type PetCardProps = {
  name: string;
  breed: string;
  imageUrl: string;
  onEdit?: () => void; 
  onDelete?: () => void;
};

export const PetCard: React.FC<PetCardProps> = ({ name, breed, imageUrl, onEdit, onDelete }) => { 
  return (
    <div className="pet-card">
      <img src={imageUrl} alt={name} />
      <div className="pet-card-info">
        <h4>{name}</h4>
        <p>{breed}</p>
      </div>

      <div className="pet-card-actions"> 
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

        {onDelete && (
          <button 
            className="pet-delete-button"
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete();
            }}
          >
            <FiTrash2 size={20} color="#FFF" />
          </button>
        )}
      </div>
    </div>
  );
};