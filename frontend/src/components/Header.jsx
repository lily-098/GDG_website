import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import ProfileButton from './ProfileButton'
import { useAuth } from '../contexts/useAuth'
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
  gap: 0.5rem;
    background: ${({ theme }) => theme.colors.background.primary};
  border: none;
  border-radius: ${({ theme }) => theme.colors.borderRadius.medium};
  justify-content: space-evenly;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: 'Google Sans', sans-serif;
  box-shadow: ${({ theme }) => theme.colors.shadows.small};
  transition: all ${({ theme }) => theme.colors.transitions.default};
  padding:0.4rem;
  
`;  

const Header = () => {
  const [authenticated,seAuthenticated] = useState(true);
  const {isAuthenticated}=useAuth()
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
      <Logo />
      <MenuButton onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>

      <Nav $isOpen={menuOpen}>
        <NavLink href="/" onClick={closeMenu}>Home</NavLink>
        <NavLink href="/#events" onClick={closeMenu}>Events</NavLink>
        <NavLink href="/team" onClick={closeMenu}>Team</NavLink>
        <NavLink href="/#sponsor" onClick={closeMenu}>Resources</NavLink>
        <NavLink href="/#contact" onClick={closeMenu}>Contact</NavLink>
      </Nav>

      <NavActions>
        {isAuthenticated && <Link to="/auth"   >
          <button className="btn btn-primary" >SignIn/SignUp</button>
          </Link>}
        <ThemeToggle toggle={toggleTheme} />
        {isAuthenticated && <ProfileButton />}
      </NavActions>
    </HeaderContainer>
  );
};

export default Header;