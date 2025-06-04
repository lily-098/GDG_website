import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaDiscord, 
  FaYoutube,
  FaArrowUp 
} from 'react-icons/fa';
import Logo from './Logo';
const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 3rem 0 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    height: 3px;
    width: 40px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
  display: inline-block;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.875rem;
`;

const ScrollToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
 padding: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
  border: none;
  
  &:hover {
    background-color: ${({ theme }) => 
      theme.name === 'light' 
        ? theme.googleColors.green.dark 
        : theme.googleColors.green.light
    };
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>

          <FooterTitle> 
            <Logo />
            </FooterTitle>
          <p>
            Google Developer Group MMMUT is a community of passionate developers, 
            designers, and enthusiasts who come together to learn, share, and grow 
            in technology.
          </p>
          <SocialLinks>
            <SocialIcon 
              href="https://twitter.com" 
              target="_blank" 
              whileHover={{ y: -3 }}
              aria-label="Twitter"
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon 
              href="https://github.com" 
              target="_blank" 
              whileHover={{ y: -3 }}
              aria-label="GitHub"
            >
              <FaGithub />
            </SocialIcon>
            <SocialIcon 
              href="https://linkedin.com" 
              target="_blank" 
              whileHover={{ y: -3 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon 
              href="https://discord.com" 
              target="_blank" 
              whileHover={{ y: -3 }}
              aria-label="Discord"
            >
              <FaDiscord />
            </SocialIcon>
            <SocialIcon 
              href="https://youtube.com" 
              target="_blank" 
              whileHover={{ y: -3 }}
              aria-label="YouTube"
            >
              <FaYoutube />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links</FooterTitle>
          <FooterLink href="#">About GDG</FooterLink>
          <FooterLink href="#">Upcoming Events</FooterLink>
          <FooterLink href="#">Resources</FooterLink>
          <FooterLink href="#">Projects</FooterLink>
          <FooterLink href="#">Become a Member</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Google Programs</FooterTitle>
          <FooterLink href="https://developers.google.com/community/gdg" target="_blank">GDG Program</FooterLink>
          <FooterLink href="https://developers.google.com/womentechmakers" target="_blank">Women Techmakers</FooterLink>
          <FooterLink href="https://developers.google.com/community/experts" target="_blank">Google Developer Experts</FooterLink>
          <FooterLink href="https://developers.google.com/community/dsc" target="_blank">Developer Student Clubs</FooterLink>
          <FooterLink href="https://developers.google.com/community/accelerators" target="_blank">Google for Startups</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterLink href="mailto:gdg@mmmut.ac.in">gdg@mmmut.ac.in</FooterLink>
          <FooterLink href="#">MMMUT, Gorakhpur</FooterLink>
          <FooterLink href="#">Uttar Pradesh, India</FooterLink>
          <FooterLink href="tel:+910000000000">+91 8874985341</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>© {new Date().getFullYear()} GDG MMMUT. All rights reserved.</p>
        <p>Powered by Google Developers</p>
      </Copyright>
      
      <ScrollToTop
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </ScrollToTop>
    </FooterContainer>
  );
};

export default Footer;