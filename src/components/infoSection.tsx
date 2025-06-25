import React from 'react';
import InfoCard from './InfoCard';
import './InfoSection.css';

type InfoSectionProps = {
  gender: string;
  breed: string;
  age: string;
  weight: string;
};

const InfoSection: React.FC<InfoSectionProps> = ({ gender, breed, age, weight }) => {
  return (
    <div className="info-section">
      <InfoCard label="Sexo" value={gender} />
      <InfoCard label="Raça" value={breed} />
      <InfoCard label="Idade" value={age} />
      <InfoCard label="Peso" value={weight} />
    </div>
  );
};

export default InfoSection;
