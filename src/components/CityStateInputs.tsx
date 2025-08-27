import React from 'react';
import { ThemedText } from './ThemedText';
import './CityStateInputs.css'; 

type CityStateInputsProps = {
  states: string[];
  cities: string[];
  selectedState: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  stateError?: string;
  cityError?: string;
};

export const CityStateInputs: React.FC<CityStateInputsProps> = ({
  states,
  cities,
  selectedState,
  onStateChange,
  onCityChange,
  stateError,
  cityError,
}) => {
  return (
    <div className="city-state-container">
      <div className="input-column state-column">
        <ThemedText type="body" style={{ marginBottom: 4 }}>Estado:</ThemedText>
        <select
          className="themed-text-input"
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value)}
        >
          <option value="">Selecione o estado</option>
          {states.map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>
        {stateError && (
          <ThemedText type="small" style={{ color: 'red', marginTop: 4 }}>
            {stateError}
          </ThemedText>
        )}
      </div>
      <div className="input-column city-column">
        <ThemedText type="body" style={{ marginBottom: 4 }}>Cidade:</ThemedText>
        <select
          className="themed-text-input"
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Selecione a cidade</option>
          {cities.map((cidade) => (
            <option key={cidade} value={cidade}>{cidade}</option>
          ))}
        </select>
        {cityError && (
          <ThemedText type="small" style={{ color: 'red', marginTop: 4 }}>
            {cityError}
          </ThemedText>
        )}
      </div>
    </div>
  );
};