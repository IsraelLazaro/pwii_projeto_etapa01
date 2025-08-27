import React from 'react';
import './ThemedButton.css';

type ThemedButtonProps = {
  type?: 'success' | 'danger' | 'transparent'| 'edit';
  shape?: 'circle';
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  type = 'success',
  shape,
  style,
  children,
  onClick,
  disabled = false,
}) => {
  const className = [
    'themed-button',
    `themed-button--${type}`,
    shape === 'circle' ? 'themed-button--circle' : '',
    disabled ? 'themed-button--disabled' : ''
  ].join(' ');

  return (
    <button 
      className={className} 
      style={style} 
      onClick={disabled ? undefined : onClick} 
      disabled={disabled} 
    >
      {children}
    </button>
  );
};