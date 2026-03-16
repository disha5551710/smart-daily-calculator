'use client';
import { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeBody({ children }) {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return <>{children}</>;
}
