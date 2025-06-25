import React from 'react';
import './ThemedView.css';

type ThemedViewProps = {
  variant?: 'card' | 'container' | 'section';
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const ThemedView: React.FC<ThemedViewProps> = ({
  variant = 'container',
  style,
  children,
}) => {
  const className = `themed-view themed-view--${variant}`;
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};