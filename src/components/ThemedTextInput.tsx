import React from 'react';
import './ThemedTextInput.css';
import { ThemedText } from './ThemedText';

type ThemedTextInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
  onChangeText?: (value: string) => void;
  style?: React.CSSProperties;
};

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  errorMessage,
  secureTextEntry,
  style,
}) => {
  return (
    <div className="themed-input-wrapper" style={style}>
      {label && <ThemedText type="subtitle" style={{ marginBottom: 4 }}>{label}</ThemedText>}
      <input
        className="themed-text-input"
        type={secureTextEntry ? 'password' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeText?.(e.target.value)}
      />
      {errorMessage && (
        <ThemedText type="small" style={{ color: 'red', marginTop: 4 }}>
          {errorMessage}
        </ThemedText>
      )}
    </div>
  );
};
