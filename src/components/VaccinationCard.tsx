import React from 'react';
import './VaccinationCard.css';

type VaccinationCardProps = {
  vaccine: string;
  date: string;
};

export const VaccinationCard: React.FC<VaccinationCardProps> = ({ vaccine, date }) => {
  return (
    <div className="vaccination-card">
      <h4>{vaccine}</h4>
      <p>{date}</p>
    </div>
  );
};