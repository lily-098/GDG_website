import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';

const ToggleButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: isDarkTheme ? 0 : 180 }}
      transition={{ duration: 0.5 }}
      aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkTheme ? <FaSun size={18} /> : <FaMoon size={18} />}
    </ToggleButton>
  );
};

export default ThemeToggle;