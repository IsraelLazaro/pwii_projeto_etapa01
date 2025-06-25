import React from 'react';
import { useThemeColor } from '../hooks/useThemeColor';
import './ThemedText.css';

type ThemedTextProps = {
  type?: 'title' | 'subtitle' | 'body' | 'small';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  lightColor?: string;
  darkColor?: string;
  onClick?: () => void; // ✅ adiciona suporte para clique
};
export const ThemedText: React.FC<ThemedTextProps> = ({
  type = 'body',
  children,
  style,
  lightColor,
  darkColor,
  onClick, // ✅ agora sim
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'textPrimary');
  const className = `themed-text themed-text--${type}`;

  return (
    <span className={className} style={{ color, ...style }} onClick={onClick}>
      {children}
    </span>
  );
};


