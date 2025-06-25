import React from 'react';
import './VaccinationSection.css';
import { VaccinationCard } from './VaccinationCard';

type Vaccination = {
  vaccine: string;
  date: string;
};

type VaccinationSectionProps = {
  vaccinations: Vaccination[];
};

export const VaccinationSection: React.FC<VaccinationSectionProps> = ({ vaccinations }) => {
  return (
    <div className="vaccination-section">
      {vaccinations.map((v, idx) => (
        <VaccinationCard key={idx} vaccine={v.vaccine} date={v.date} />
      ))}
    </div>
  );
};