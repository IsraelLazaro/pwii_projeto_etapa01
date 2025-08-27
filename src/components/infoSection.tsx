import React from 'react';
import { InfoCard } from './InfoCard';
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
      <InfoCard title="Sexo" description={gender} />
      <InfoCard title="Raça" description={breed} />
      <InfoCard title="Idade" description={age} />
      <InfoCard title="Peso" description={weight} />
    </div>
  );
};

export default InfoSection;
