import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView, useScroll } from 'framer-motion';
import { FaGit, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Uploadbox from '../../Upload/Uploadbox';
import {useAuth} from "../contexts/useAuth"
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
const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid ${props => props.theme.primary};
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

// Dummy team data
const teamData =[
  {
    "id": 1,
    "name": "Aditya Pratap Singh",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 2,
    "name": "Anmol Tomar",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 3,
    "name": "Avanish Upadhyay",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "https://res.cloudinary.com/dfstpdwih/image/upload/v1747396588/Codehelp/tmp-4-1747396587840.jpg",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 4,
    "name": "Ujjwal Gupta",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 5,
    "name": "Saksham Mishra",
    "role": "Android Dev Lead",
    "badge": "Android Developer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 6,
    "name": "Vikhyat Singh",
    "role": "Android Dev Lead",
    "badge": "Android Developer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 7,
    "name": "Vivek Maurya",
    "role": "Android Dev Lead",
    "badge": "Android Developer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 8,
    "name": "Anurag Yadav",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 9,
    "name": "Devesh Sharma",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 10,
    "name": "Madhu Yadav",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 11,
    "name": "Prateek Khare",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 12,
    "name": "Harshit Singh",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 13,
    "name": "Shivam Singh",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 14,
    "name": "Kriti Yadav",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 15,
    "name": "Kunal",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 16,
    "name": "Ananya Gupta",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 17,
    "name": "Ananya",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 18,
    "name": "Ashutosh Maurya",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 19,
    "name": "Atishay Kumar Pandey",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 20,
    "name": "Jahnawi Agarwal",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 21,
    "name": "Madhur Pratap Singh Gaur",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 22,
    "name": "Sandeep Singh (ECE)",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 23,
    "name": "Aditya Gaur",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 24,
    "name": "Pranjal Mani",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 25,
    "name": "Jyoti Maurya",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 26,
    "name": "Gayetri Verma",
    "role": "AI/ML, Cybersecurity & Cloud Team",
    "badge": "AI/ML Enthusiast",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 27,
    "name": "Aditya Patel",
    "role": "AI/ML, Cybersecurity & Cloud Team",
    "badge": "AI/ML Enthusiast",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 28,
    "name": "Sarika Kaushal",
    "role": "AI/ML, Cybersecurity & Cloud Team",
    "badge": "AI/ML Enthusiast",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 29,
    "name": "Aditya Kumar Kasaduhan",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 30,
    "name": "Aastha Gupta",
    "role": "GDG Lead 2024",
    "badge": "Android Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 31,
    "name": "Sunil Kaushal",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 32,
    "name": "Sandeep Singh (ECE)",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 33,
    "name": "Ritika Yadav",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 34,
    "name": "Divyansh Gupta",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 35,
    "name": "Tanya Baltham",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 36,
    "name": "Avinash Mishra",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 37,
    "name": "Abhinav Kumar",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 38,
    "name": "Nainsi Gupta",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 39,
    "name": "Abhirup Pratap Chaurasiya",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 40,
    "name": "Paridhi Mittal",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 41,
    "name": "Anuj Kashyap",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  }
  ,
  {
    "id": 42,
    "name": "Aastha Singh Sachan",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 43,
    "name": "Abhishek Yadav",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 44,
    "name": "Madhav Trivedi",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 45,
    "name": "Saurabh Singh",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 46,
    "name": "Sonali Ravi",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 47,
    "name": "Anubhav Gupta",
    "role": "GDG Lead 2023",
    "badge": "AI/ML Enthusiast",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 48,
    "name": "Ritika Agrahari",
    "role": "AI/ML & Cybersecurity Team",
    "badge": "AI/ML Enthusiast",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 49,
    "name": "Selvik Tripathi",
    "role": "AI/ML & Cybersecurity Team",
    "badge": "AI/ML Enthusiast",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 50,
    "name": "Ankit Verma",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 51,
    "name": "Devansh Tripathi",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 52,
    "name": "Sarthak Vishwakarma",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 53,
    "name": "Aniket Chaudhary",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 54,
    "name": "Anul Kumar",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 55,
    "name": "Sumit Kumar",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 56,
    "name": "Anam Kumar Tiwari",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 57,
    "name": "Gaurav Kumar Sen",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 58,
    "name": "Saemvi Gupta",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 59,
    "name": "Ajit Kumar Yadav",
    "role": "Marketing & Sponsorship Team",
    "badge": "Marketing Specialist",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 60,
    "name": "Atulya Vaibhav Pandey",
    "role": "Marketing & Sponsorship Team",
    "badge": "Marketing Specialist",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 61,
    "name": "Yogeshwar Gupta",
    "role": "Marketing & Sponsorship Team",
    "badge": "Marketing Specialist",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 62,
    "name": "Aniket Gupta",
    "role": "Event Coordination Team",
    "badge": "Event Coordinator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 63,
    "name": "Arpita Gupta",
    "role": "Event Coordination Team",
    "badge": "Event Coordinator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 64,
    "name": "Ishita Shukla",
    "role": "Event Coordination Team",
    "badge": "Event Coordinator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  }
]
;

export default function Team() {
  const {fileUrl}=useAuth();
  const [upload,setUpload]=useState(false);
  const [selectedYear,setSelectedYear]=useState("GDG Lead");
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
  function handleUpload() {
    setUpload(true);
  }
const filteredMembers = selectedYear.includes( 'GDG Lead')? teamData.filter(member=>member.role.includes("GDG Lead")) : teamData.filter(member => member.year === selectedYear);
console.log("fileUrll",fileUrl)

  return (
    <>
    <TeamSectionContainer id="team" className="animate-section">
      <SectionContent ref={sectionRef}>
        <SectionHeader>
          <SectionTitle>Our Team</SectionTitle>
          <SectionDescription>
            Meet the passionate individuals who make GDG MMMUT possible. Our team is dedicated to fostering a vibrant tech community and organizing impactful events.
          </SectionDescription>
        </SectionHeader>
        <FilterContainer>
            <FilterButton 
          active={selectedYear==="GDG Lead"} 
          onClick={() => setSelectedYear('GDG Lead')}
        >
          All Leads
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <TeamGrid>
            {filteredMembers?.map((member) => (
              <TeamMemberCard key={member.id} variants={itemVariants}>
                <MemberImage>
                  <img src={fileUrl[member.id-1]} alt={member.name} />
                  <button onClick={handleUpload}>Upload</button>
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
                      target="_ blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s LinkedIn`}
                  >
                      <i className="fab fa-linkedin"><FaLinkedin /></i>
                    </SocialLink>
                    <SocialLink 
                      href={member.social.twitter}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <i className="fab fa-twitter"><FaTwitter /></i>
                    </SocialLink>
                    <SocialLink 
                      href={member.social.github}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <i className="fab fa-github"><FaGit /></i>
                    </SocialLink>
                  </SocialLinks>
                </MemberContent>
              </TeamMemberCard>
            ))}
          </TeamGrid>
        </motion.div>
      </SectionContent>
    </TeamSectionContainer>
      {upload &&<motion.div style={{
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent:" center",
  alignItems: "center",
  zIndex: "1000"
}}
>
      <Uploadbox setUpload={setUpload} />
     </motion.div>}
    </>
  );
};