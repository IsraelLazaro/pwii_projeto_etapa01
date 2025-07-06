import React from 'react';
import './ThemedButton.css';

type ThemedButtonProps = {
  type?: 'success' | 'danger' | 'transparent'| 'edit';
  shape?: 'circle';
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  type = 'success',
  shape,
  style,
  children,
  onClick,
}) => {
  const className = [
    'themed-button',
    `themed-button--${type}`,
    shape === 'circle' ? 'themed-button--circle' : ''
  ].join(' ');

  return (
    <button className={className} style={style} onClick={onClick}>
      {children}
    </button>
  );
};