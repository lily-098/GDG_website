import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Container = styled.div`
  margin: 4rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const EventCard = styled(motion.div)`
  background: linear-gradient(145deg, #ffffff, #f1f1f1);
  border: 2px solid #90caf9;
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  width: 90%;
  max-width: 900px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled(motion.h3)`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1976d2;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #455a64;
`;

const Countdown = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  color: #1e88e5;
  display: flex;
  gap: 0.5rem;

  span {
    background: #e3f2fd;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled(motion.div)`
  height: 20rem;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(66, 133, 244, 0.3) 10%, transparent 80%);
  border-radius: 1.5rem;
  z-index: -1;
`;
 const upcomingEvents = [
    {
      title: "Google I/O Extended MMMUT 2025",
      date: "May 15, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Central Auditorium, MMMUT Campus",
      description: "Join us for Google I/O Extended, where we'll stream the keynotes and sessions from Google I/O and host local workshops focused on the latest Google technologies.",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      upcoming: true
    }
  ];
const NextEventCountdown = () => {
  const calculateTimeLeft = () => {
    const eventDate = new Date("2025-06-01T00:00:00"); // Example date
    const currentTime = new Date();
    const difference = eventDate - currentTime;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.from("img", { opacity: 0, duration: 1, scale: 0.9 });
  }, []);

  return (
    <Container>
      <EventCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <GlowEffect />
        <Grid>
          <div>
            <Title
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Next Event Countdown
            </Title>
            <Subtitle
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {upcomingEvents[0].title}
            </Subtitle>
            <Countdown>
              {Object.keys(timeLeft).length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <span>{timeLeft.days}d</span>
                  <span>{timeLeft.hours}h</span>
                  <span>{timeLeft.minutes}m</span>
                  <span>{timeLeft.seconds}s</span>
                </motion.div>
              ) : (
                <div>Event has started!</div>
              )}
            </Countdown>
          </div>
          <ImageWrapper
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={upcomingEvents[0].image}
              alt={upcomingEvents[0].title}
            />
          </ImageWrapper>
        </Grid>
      </EventCard>
    </Container>
  );
};

export default NextEventCountdown;