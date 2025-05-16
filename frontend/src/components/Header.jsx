import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import { FaBars, FaTimes } from 'react-icons/fa'

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: ${props => props.$scrolled 
    ? props.theme.colors.background.primary 
    : 'transparent'};
  box-shadow: ${props => props.$scrolled 
    ? `0 2px 10px ${props.theme.colors.shadow}` 
    : 'none'};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-family: 'Google Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};

  img {
    height: 36px;
    margin-right: 0.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.theme.colors.background.primary};
    box-shadow: -2px 0 10px ${props => props.theme.colors.shadow};
    transition: right 0.3s ease;
    padding: 2rem;
    z-index: 99;
  }
`;

const NavLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  z-index: 100;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderContainer 
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo to="/">
        <img src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-goog/events/GDG%20-%20logo%20with%20background.png" alt="GDG MMMUT Logo" />
        <span>GDG MMMUT</span>
      </Logo>

      <MenuButton onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      <Nav $isOpen={menuOpen}>
        <NavLink href="/" onClick={closeMenu}>Home</NavLink>
        <NavLink href="/#events" onClick={closeMenu}>Events</NavLink>
        <NavLink href="/#team" onClick={closeMenu}>Team</NavLink>
        <NavLink href="/#resources" onClick={closeMenu}>Resources</NavLink>
        <NavLink href="/#contact" onClick={closeMenu}>Contact</NavLink>
      </Nav>

      <NavActions>
        <ThemeToggle toggle={toggleTheme} />
      </NavActions>
    </HeaderContainer>
  );
};

export default Header;