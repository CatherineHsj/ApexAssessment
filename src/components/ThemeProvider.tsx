import React, { createContext, useContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const toggleTheme = (theme: string) => {
    setTheme(theme === 'light' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${currentTheme.backgroundColor} ${currentTheme.textColor}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
