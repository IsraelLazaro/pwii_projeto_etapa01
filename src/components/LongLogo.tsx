import React from 'react';
import { ThemedText } from './ThemedText';
import './LongLogo.css';

type LongLogoProps = {
  type?: 'logo' | 'profile';
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const LongLogo: React.FC<LongLogoProps> = ({
  type = 'logo',
  style,
  children,
  ...props
}) => {
  const className = `long-logo long-logo--${type}`;
  return (
    <div className={className} style={style} {...props}>
      <img 
        src="/assets/images/logo-pet.png" 
        alt="Logo" 
        className={`long-logo__image long-logo__image--${type}`} 
      />
      <ThemedText type="subtitle" style={{ marginLeft: 12 }}>
        DoggyConnect
      </ThemedText>
      {children}
    </div>
  );
};