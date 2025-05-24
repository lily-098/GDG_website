import React, { useEffect, useRef } from 'react';
import { Code, Globe, Users, Lightbulb, ChartNetworkIcon, Network, Container } from 'lucide-react';
import '../styles/About.css';
import { FaAd } from 'react-icons/fa';
import styled from 'styled-components';

const Aboutid=styled.section`
  background-color: var(--surface);
  padding: 100px 20px;
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
      description: 'Connect with developers from around the world and be part of Google\'s global developer network.'
    },
    {
      icon: <Code size={36} />,
      title: 'Android Development',
      description: 'Learn new technologies through practical workshops led by industry experts and Google Developer Experts.'
    },
    {
      icon: <Users size={36} />,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Meet like-minded developers, form valuable connections, and collaborate on exciting projects.'
    },
    {
      icon: <Lightbulb size={36} />,
      title: 'Cybersecurity and Cryptography',
      description: 'Get inspired, share ideas, and stay ahead of the curve with the latest Google technologies and tools.'
    },
    {
        icon:<ChartNetworkIcon size={36} />,
        title:'BlockChain & Web 3.0',
        description:'Be Focused'
    },{
        icon:<Network size={36}/>,
        title:'Open Source & Cloud Computing',
        description:'Compute the Clouds'
    }
  ];

  return (
    <Aboutid className="about">
      <Container>
        <div ref={sectionRef} className="about-header animate-on-scroll">
          <h2 className="section-title">About GDG MMMUT</h2>
          <p className="about-description">
            Google Developer Groups (GDGs) are community-driven groups organized by passionate developers interested in Google's developer technology. At GDG MMMUT, we host a variety of technical events throughout the year, including workshops, talks, conferences, and much more!
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="about-stats">
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
        </div>
      </Container>
    </Aboutid>
  );
};

export default About;