import React from 'react';
import './InfoCard.css';

type InfoCardProps = {
  title: string;
  description: string;
};

export const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};