import React from 'react';
import './SearchBar.css';

type SearchBarProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
  onChange
}) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};