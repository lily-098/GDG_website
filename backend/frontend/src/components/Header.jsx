import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import ProfileButton from './ProfileButton';
import { useAuth } from '../contexts/useAuth';
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${(props) => (props.$isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.background.primary};
    box-shadow: -2px 0 10px ${(props) => props.theme.colors.shadow};
    transition: right 0.3s ease-in-out;
    padding: 2rem;
    z-index: 99;
  }
`;
const Profile = styled.span`
  position: relative;
  margin-right: -15rem;

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`;

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: ${(props) =>
    props.$scrolled ? props.theme.colors.background.primary : 'transparent'};
  box-shadow: ${(props) =>
    props.$scrolled ? `0 2px 10px ${props.theme.colors.shadow}` : 'none'};

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
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
const Button = styled.button`
  height: 2.5rem;
  width: 9rem;
  background-color: ${({ theme }) => theme.googleColors.blue.darker};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.googleColors.blue.dark};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
    background-color: ${({ theme }) => theme.googleColors.blue.darker};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.googleColors.blue.light};
    outline-offset: 2px;
  }

  @media (max-width: 1200px) {
    width: 9rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 8rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 0.8rem;
    height: 2.25rem;
  }

  @media (max-width: 320px) {
    width: 100%;
    font-size: 0.7rem;
    height: 2rem;
    padding: 0.25rem;
  }
`;


const Header = () => {
  const { isAuthenticated } = useAuth();
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
        <NavLink href="/events" onClick={closeMenu}>Events</NavLink>
        <NavLink href="/team" onClick={closeMenu}>Team</NavLink>
        <NavLink href="/#sponsors" onClick={closeMenu}>Sponsor</NavLink>
        <NavLink href="/#contact" onClick={closeMenu}>Contact</NavLink>
        

        {isAuthenticated && (
          <Profile>
            <ProfileButton />
          </Profile>
        )}
      </Nav>

      <NavActions>
        {!isAuthenticated && (
          <Link to="/auth">
            <Button>SignIn/SignUp</Button>
          </Link>
        )}
        <ThemeToggle toggle={toggleTheme} />
      </NavActions>
    </HeaderContainer>
  );
};

export default Header;
