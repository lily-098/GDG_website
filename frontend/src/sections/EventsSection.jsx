import React, { useState } from 'react'
import NextEventCountdown from '../components/events/NextEventCountdown'
import RegisterModal from '../components/RegisterForm';
import { useTheme } from 'styled-components';
const eventsData=[
    {
      id: '1',
      title: 'Google I/O Extended MMMUT 2025',
      description: 'Join us for Google I/O Extended, where we\'ll watch and discuss the keynote and sessions from Google I/O 2025. Network with fellow developers and learn about the latest Google technologies.',
      date: '2025-06-15',
      time: '10:00 AM - 5:00 PM',
      location: 'MMMUT Campus, Gorakhpur',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'upcoming',
      tags: ['Conference', 'Google I/O', 'Android', 'Web'],
      attendees: 250,
      speakers: [
        {
          name: 'Dr. Aisha Kumar',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          title: 'AI Research Lead, Google'
        },
        {
          name: 'Raj Patel',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          title: 'Senior Android Developer'
        }
      ]
    }]
export default function EventsSection() {
    const [close,setclose]=useState(true);
    const {theme}=useTheme()
    const nextEvent = eventsData.find((event) => event.status === "upcoming");
    function handleClose(){
        setclose(true);
    }
  return (
    <>
    <div style={{padding: '6rem', backgroundColor: `${({theme})=>theme.colors.background.secondary}`, borderRadius: '8px' }}>
        
      <NextEventCountdown event={nextEvent} setclose={setclose}/>
      <button className='h-fit w-fit btn-primary p-2 ' style={{marginTop:"1rem", marginLeft:"1rem"}} onClick={()=>window.location.href="/events"} >Explore More</button>
    </div>
    {!close && <RegisterModal event={nextEvent} onClose={handleClose}/>}
    </>
  )
}
