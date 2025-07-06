
import { useEffect } from 'react';
import { useTheme } from './useThemeColor';

export function useBodyThemeClass() {
  const theme = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);
}
