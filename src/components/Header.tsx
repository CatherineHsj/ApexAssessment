import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();


  const handleChange = () => {
    toggleTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`border-b border-gray-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Where in the world?</h1>
        <label className="flex items-center cursor-pointer justify-between">
          <DarkModeSwitch
            checked={theme === 'dark'}
            onChange={handleChange}
            size={25}
            style={{ marginRight: '10' }}
          />
          <span className="mr-2">Mode</span>
        </label>
      </div>
    </div>

  );
};

export default Header;
