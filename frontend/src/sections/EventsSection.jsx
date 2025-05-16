import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';

const EventsSectionContainer = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
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

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const EventCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.shadow};
  }
`;

const EventImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${EventCard}:hover & img {
    transform: scale(1.05);
  }
`;

const EventBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ theme, $type }) => {
    switch($type) {
      case 'workshop': return theme.googleColors.blue.light;
      case 'hackathon': return theme.googleColors.red.light;
      case 'webinar': return theme.googleColors.green.light;
      case 'meetup': return theme.googleColors.yellow.light;
      default: return theme.colors.primary;
    }
  }};
  color: ${({ theme, $type }) => {
    switch($type) {
      case 'workshop': return theme.googleColors.blue.darker;
      case 'hackathon': return theme.googleColors.red.darker;
      case 'webinar': return theme.googleColors.green.darker;
      case 'meetup': return theme.googleColors.yellow.darker;
      default: return theme.colors.text.inverse;
    }
  }};
`;

const EventContent = styled.div`
  padding: 1.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EventDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const RegisterButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => 
      theme.name === 'light' 
        ? theme.googleColors.blue.dark 
        : theme.googleColors.blue.light
    };
  }
`;

// Dummy events data
const eventsData = [
  {
    id: 1,
    title: " Hackblitz",
    type: "Event",
    date: "March 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "CS Department, MMMUT",
    capacity: "50 participants",
    description: "Build innovative solutions using different technologies mainly providing solutions to real world challenges!",
    image: "https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg"
  },
  {
    id: 2,
    title: "Web Devlopment",
    type: "Workshop",
    date: "April 1-2, 2024",
    time: "3 days",
    location: "Online",
    capacity: "100 teams",
    description: "Learn to build beautiful cross-platform web applications with basics for web devlopment. Perfect for beginners!",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
  },
  {
    id: 3,
    title: "Machine Learning Webinar",
    type: "webinar",
    date: "March 20, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Online",
    capacity: "200 participants",
    description: "Deep dive into TensorFlow and machine learning concepts with industry experts.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg"
  },
  {
    id: 4,
    title: "App Devlopment",
    type: "Workshop",
    date: "March 25, 2024",
    time: "5:00 PM - 7:00 PM",
    location: "Seminar Hall, MMMUT",
    capacity: "75 participants",
    description: "Network with fellow App developers while learning and sharing your experiences.",
    image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg"
  },
  {
    id: 5,
    title: "Google Cloud Study Jam",
    type: "workshop",
    date: "April 10, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Online",
    capacity: "150 participants",
    description: "Hands-on workshop to learn Google Cloud Platform fundamentals.",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg"
  }
];

const EventsSection = () => {
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
    <EventsSectionContainer id="events" className="animate-section">
      <SectionContent ref={sectionRef}>
        <SectionHeader>
          <SectionTitle>Upcoming Events</SectionTitle>
          <SectionDescription>
            Join us for exciting events, workshops, and meetups. Learn from experts, network with peers, and stay updated with the latest in technology.
          </SectionDescription>
        </SectionHeader>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <EventsGrid>
            {eventsData.map((event) => (
              <EventCard key={event.id} variants={itemVariants}>
                <EventImage>
                  <img src={event.image} alt={event.title} />
                  <EventBadge $type={event.type}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </EventBadge>
                </EventImage>
                
                <EventContent>
                  <EventTitle>{event.title}</EventTitle>
                  
                  <EventInfo>
                    <FaCalendar />
                    <span>{event.date}</span>
                  </EventInfo>
                  
                  <EventInfo>
                    <FaClock />
                    <span>{event.time}</span>
                  </EventInfo>
                  
                  <EventInfo>
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </EventInfo>
                  
                  <EventInfo>
                    <FaUsers />
                    <span>{event.capacity}</span>
                  </EventInfo>
                  
                  <EventDescription>{event.description}</EventDescription>
                  
                  <RegisterButton
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                  </RegisterButton>
                </EventContent>
              </EventCard>
            ))}
          </EventsGrid>
        </motion.div>
      </SectionContent>
    </EventsSectionContainer>
  );
};

export default EventsSection;