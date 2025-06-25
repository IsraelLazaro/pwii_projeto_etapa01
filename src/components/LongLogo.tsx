import React from 'react';
import { ThemedText } from './ThemedText';
import './LongLogo.css';


export const LongLogo: React.FC = () => {
  return (
    <div className="long-logo">
      <img src="/assets/images/logo-pet.png" alt="Logo" className="long-logo__image" />

      <ThemedText type="subtitle" style={{ marginLeft: 12 }}>
         DoggyConnect
      </ThemedText>
    </div>
  );
};
