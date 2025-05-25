import React, { useEffect, useRef } from 'react';
import { Code, Globe, Users, Lightbulb, Network } from 'lucide-react'; // Corrected imports
import styled from 'styled-components';
import '../styles/About.css'; // Ensure this file exists and paths are correct

const Aboutid = styled.section`
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 100px 20px;
`;
const Container=styled.div`
  display: flex;
  flex-direction: column;
`
const FeaturesGrid = styled.div`
   display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
  padding-left: 4rem;
  padding-right: 4rem;
  .feature-card{
    background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform var(--transition-medium), box-shadow ${({theme})=>theme.colors.transitions.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }}
  .feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
  transition: transform var(--transition-short), box-shadow ${({theme})=>theme.colors.transitions.default};
}
.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  background-color: ${({ theme }) => theme.colors.background.primary};
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
  color:${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.colors.transitions.default};
  font-size: var(--font-size-3xl);
}
.feature-card:nth-child(1) .feature-icon {
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background.primary};
}

.feature-card:nth-child(2) .feature-icon {
 ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
}

.feature-card:nth-child(3) .feature-icon {
  ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
}

.feature-card:nth-child(4) .feature-icon {
  ${({ theme }) => theme.colors.quaternary};
  background-color: ${({ theme }) => theme.colors.background.quaternary};
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
}

.feature-card p {
  color:${({ theme }) => theme.colors.text.tertiary};
  font-size: var(--font-size-md);
  line-height: 1.6;
}

`
const AboutStats = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xxl);
  .stat-card {
  background: linear-gradient(135deg,${({ theme }) => theme.colors.background.primary}, ${({ theme }) => theme.colors.background.secondary});
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};
  transition: transform ${({ theme }) => theme.colors.transitions.default}, box-shadow ${({ theme }) => theme.colors.transitions.default};
  transform: translateY(30px);
}

.stat-card:hover {
  transform: translateY(-5px);
  opacity: 1;
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
}

.stat-number {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat-label {
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: var(--font-size-md);
  font-weight: 500;
}

@media (max-width: 768px) {
  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .about-stats {
    grid-template-columns: 1fr;
  }
}
`
const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      cardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  const features = [
    {
      icon: <Globe size={36} />,
      title: 'Web Development',
      description: "Connect with developers from around the world and be part of Google's global developer network.",
    },
    {
      icon: <Code size={36} />,
      title: 'Android Development',
      description: 'Learn new technologies through practical workshops led by industry experts and Google Developer Experts.',
    },
    {
      icon: <Users size={36} />,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Meet like-minded developers, form valuable connections, and collaborate on exciting projects.',
    },
    {
      icon: <Lightbulb size={36} />,
      title: 'Cybersecurity and Cryptography',
      description: 'Get inspired, share ideas, and stay ahead of the curve with the latest Google technologies and tools.',
    },
    {
      icon: <Network size={36} />,
      title: 'Blockchain & Web 3.0',
      description: 'Focus on the future of decentralized technologies.',
    },
    {
      icon: <Network size={36} />,
      title: 'Open Source & Cloud Computing',
      description: 'Harness the power of open-source tools and scalable cloud solutions.',
    },
  ];

  return (
    <Aboutid className="about">
      <Container > {/* Fixed the missing wrapper */}
        <div ref={sectionRef} className="about-header animate-on-scroll">
          <h2 className="section-title">About GDG MMMUT</h2>
          <p className="about-description">
            Founded on 26th September 2020 by our visionary alumnus, Abhishek Kumar Yadav, GDG MMMUT has grown from its roots as Developer Student Clubs (DSC) under the Google Developers Program to the largest developer community in our campus and region.With a mission to drive innovation, promote technology, and empower skill development, we are a thriving hub for tech enthusiasts committed to shaping the future of technology
          </p>
          <h3>Join a thriving community of Google developers.</h3>
          </div>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </FeaturesGrid>

        <AboutStats>
          <div className="stat-card">
            <span className="stat-number">2000+</span>
            <span className="stat-label">Community Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50+</span>
            <span className="stat-label">Events Organized</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100+</span>
            <span className="stat-label">Speakers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years Active</span>
          </div>
        </AboutStats>
      </Container>
    </Aboutid>
  );
};

export default About;
