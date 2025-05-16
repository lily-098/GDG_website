import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const TeamSectionContainer = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;
`;
const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.5rem;
    height: 4px;
    width: 60px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
const SectionDescription = styled.p`
  font-size: 1.125rem;
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;
const TeamMemberCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.shadow};
  }
`;
const MemberImage = styled.div`
  height: 250px;
  overflow: hidden;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.background.secondary}
    );
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  ${TeamMemberCard}:hover & img {
    transform: scale(1.05);
  }
`;
const MemberContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const RoleBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme, $role }) => {
    switch($role) {
      case 'lead': return theme.googleColors.blue.light;
      case 'core': return theme.googleColors.red.light;
      case 'organizer': return theme.googleColors.green.light;
      case 'volunteer': return theme.googleColors.yellow.light;
      default: return theme.colors.primary;
    }
  }};
  color: ${({ theme, $role }) => {
    switch($role) {
      case 'lead': return theme.googleColors.blue.darker;
      case 'core': return theme.googleColors.red.darker;
      case 'organizer': return theme.googleColors.green.darker;
      case 'volunteer': return theme.googleColors.yellow.darker;
      default: return theme.colors.text.inverse;
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;
const MemberName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;
const MemberRole = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;
const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.25rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
// Dummy team data
const teamData = [
  {
    id: 1,
    name: "Avanish Upadhyay",
    role: "GDG ",
    badge: "Web Developer",
    image: "https://res.cloudinary.com/dfstpdwih/image/upload/v1747396588/Codehelp/tmp-4-1747396587840.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  },
  {
    id: 2,
    name: "Atishay",
    role: "Content Writer",
    badge: "Management",
    image: "https://res.cloudinary.com/dfstpdwih/image/upload/v1747396578/Codehelp/tmp-3-1747396578290.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  },
  {
    id: 3,
    name: "Kunal Srivastava",
    role: "DSA/CP Mentor",
    badge: "core",
    image: "https://res.cloudinary.com/dfstpdwih/image/upload/v1747396598/Codehelp/tmp-5-1747396598470.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  },
  {
    id: 4,
    name: "Anurag Yadav",
    role: "Community Manager",
    badge: "core",
    image: "https://res.cloudinary.com/dfstpdwih/image/upload/v1747396567/Codehelp/tmp-2-1747396567070.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  },
  {
    id: 5,
    name: "Abhay Chauhan",
    role: "Technical Coordinator",
    badge: "organizer",
    image: "https://res.cloudinary.com/dfstpdwih/image/upload/v1747396551/Codehelp/tmp-1-1747396551740.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  }
];

const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <TeamSectionContainer id="team" className="animate-section">
      <SectionContent ref={sectionRef}>
        <SectionHeader>
          <SectionTitle>Our Team</SectionTitle>
          <SectionDescription>
            Meet the passionate individuals who make GDG MMMUT possible. Our team is dedicated to fostering a vibrant tech community and organizing impactful events.
          </SectionDescription>
        </SectionHeader>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <TeamGrid>
            {teamData.map((member) => (
              <TeamMemberCard key={member.id} variants={itemVariants}>
                <MemberImage>
                  <img src={member.image} alt={member.name} />
                </MemberImage>
                
                <MemberContent>
                  <RoleBadge $role={member.badge}>
                    {member.badge.charAt(0).toUpperCase() + member.badge.slice(1)}
                  </RoleBadge>
      
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <SocialLinks>
                    <SocialLink 
                      href={member.social.linkedin}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s LinkedIn`}
                  >
                      <i className="fab fa-linkedin"></i>
                    </SocialLink>
                    <SocialLink 
                      href={member.social.twitter}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <i className="fab fa-twitter"></i>
                    </SocialLink>
                    <SocialLink 
                      href={member.social.github}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <i className="fab fa-github"></i>
                    </SocialLink>
                  </SocialLinks>
                </MemberContent>
              </TeamMemberCard>
            ))}
          </TeamGrid>
        </motion.div>
      </SectionContent>
    </TeamSectionContainer>
  );
};

export default TeamSection;