import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const TeamContainer = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid ${props => props.theme.primary};
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const MemberCard = styled(motion.div)`
  background: ${props => props.theme.surfaceElevated};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px ${props => props.theme.shadowColor};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const MemberImage = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const MemberInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: 1.4rem;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 5px;
`;

const MemberRole = styled.p`
  color: ${props => props.theme.primary};
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const MemberYear = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.textSecondary};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Event = () => {
  const [selectedYear, setSelectedYear] = useState('all');

  const teamMembers = [
    {
      name: "John Doe",
      role: "Community Lead",
      year: "2024",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Jane Smith",
      role: "Technical Lead",
      year: "2023",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Mike Johnson",
      role: "Event Coordinator",
      year: "2022",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    }
  ];

  const filteredMembers = selectedYear === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.year === selectedYear);

  return (
    <TeamContainer>
      <Header>
        <Title>Meet Our Team</Title>
        <Description>
          Get to know the amazing individuals who make GDG MMMUT possible. Our team
          is dedicated to fostering a vibrant tech community and organizing
          impactful events.
        </Description>
      </Header>

      <FilterContainer>
        <FilterButton 
          active={selectedYear === 'all'} 
          onClick={() => setSelectedYear('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          active={selectedYear === '2024'} 
          onClick={() => setSelectedYear('2024')}
        >
          2024
        </FilterButton>
        <FilterButton 
          active={selectedYear === '2023'} 
          onClick={() => setSelectedYear('2023')}
        >
          2023
        </FilterButton>
        <FilterButton 
          active={selectedYear === '2022'} 
          onClick={() => setSelectedYear('2022')}
        >
          2022
        </FilterButton>
      </FilterContainer>

      <TeamGrid>
        <AnimatePresence>
          {filteredMembers.map((member, index) => (
            <MemberCard
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <MemberImage>
                <img src={member.image} alt={member.name} />
              </MemberImage>
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberYear>Class of {member.year}</MemberYear>
                <SocialLinks>
                  <SocialLink href={member.social.github} target="_blank">
                    <Github size={20} />
                  </SocialLink>
                  <SocialLink href={member.social.linkedin} target="_blank">
                    <Linkedin size={20} />
                  </SocialLink>
                  <SocialLink href={member.social.twitter} target="_blank">
                    <Twitter size={20} />
                  </SocialLink>
                </SocialLinks>
              </MemberInfo>
            </MemberCard>
          ))}
        </AnimatePresence>
      </TeamGrid>
    </TeamContainer>
  );
};

export default Event;