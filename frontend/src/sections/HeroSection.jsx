import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: 80px;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.googleColors.blue.primary} 0%,
    ${({ theme }) => theme.googleColors.red.primary} 25%,
    ${({ theme }) => theme.googleColors.yellow.primary} 50%,
    ${({ theme }) => theme.googleColors.green.primary} 75%,
    ${({ theme }) => theme.googleColors.blue.primary} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  margin-bottom: 2.5rem;
  max-width: 800px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(motion.a)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 118, 255, 0.39);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 118, 255, 0.23);
    background-color: ${({ theme }) => 
      theme.name === 'light' 
        ? theme.googleColors.blue.dark 
        : theme.googleColors.blue.light
    };
  }
`;

const SecondaryButton = styled(motion.a)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const FloatingObjects = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

const FloatingObject = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
  pointer-events: none;

  &.blue {
    background-color: ${({ theme }) => theme.googleColors.blue.light};
  }
  
  &.red {
    background-color: ${({ theme }) => theme.googleColors.red.light};
  }
  
  &.yellow {
    background-color: ${({ theme }) => theme.googleColors.yellow.light};
  }
  
  &.green {
    background-color: ${({ theme }) => theme.googleColors.green.light};
  }
`;

const HeroSection = () => {
  const floatingRef = useRef(null);
  
  useEffect(() => {
    if (!floatingRef.current) return;
    
    // Create floating objects
    const colors = ['blue', 'red', 'yellow', 'green'];
    const objects = [];
    
    for (let i = 0; i < 10; i++) {
      const element = document.createElement('div');
      element.classList.add('floating-object');
      element.classList.add(colors[i % colors.length]);
      element.style.width = `${Math.random() * 100 + 50}px`;
      element.style.height = element.style.width;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      floatingRef.current.appendChild(element);
      objects.push(element);
    }
    
    // Animate with GSAP
    objects.forEach((obj) => {
      gsap.to(obj, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        duration: `random(20, 40)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(obj, {
        rotation: `random(-360, 360)`,
        duration: `random(20, 40)`,
        repeat: -1,
        ease: 'none',
      });
    });
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf(objects);
      objects.forEach(obj => obj.remove());
    };
  }, []);
  
  return (
    <HeroContainer>
      <FloatingObjects ref={floatingRef}>
        {/* Floating objects will be added here via JS */}
      </FloatingObjects>
      
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Google Developer Group MMMUT
        </HeroTitle>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A community of passionate developers building the future with Google technologies
        </Subtitle>
        
        <ButtonsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PrimaryButton 
            href="#" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Community
          </PrimaryButton>
          
          <SecondaryButton 
            href="#events" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upcoming Events
          </SecondaryButton>
        </ButtonsContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;