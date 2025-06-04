import React, { useState } from 'react'
import NextEventCountdown from '../components/events/NextEventCountdown'
import RegisterModal from '../components/RegisterForm';
import { useTheme } from 'styled-components';
import { QrCode } from 'lucide-react';
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
    const [verify,setverify]=useState(false)
    const nextEvent = eventsData.find((event) => event.status === "upcoming");
    function handleClose(){
        setclose(true);
    }
  return (
    
    <>
    <div style={{alignItems:"center",justifyContent:"space-evenly",padding: '6rem', backgroundColor: `${(theme)=>theme.colors.background.secondary}`, borderRadius: '8px' }}>
      <div className='flex w-full justify-around'>
      <div className=" bg-white rounded-xl shadow-lg  h-max flex flex-col gap-5 w-fit" style={{ padding:"1.5rem",paddingRight:"7rem", paddingLeft:"4rem"}}>
      <h3 className="text-xl  " style={{ fontFamily: 'Google Sans, sans-serif', fontSize:"1.5rem", fontWeight:"700", color:`#3b82f6` }}>
        Certificate Verification
      </h3>
      <QrCode size={70} style={{marginLeft:"6rem"}}/>
      <label htmlFor="serial" className="text-sm font-medium text-gray-700" style={{fontWeight:"600"}}>
        Serial Number
      </label>
      <input 
        id="serial"
        type="text"
        placeholder="e.g., ABC123456789"
        className="h-12 text-lg border-gray-900 focus:border-blue-500 focus:ring-blue-500" style={{border:"1px solid #e0e0e0", padding:"1rem"}} />
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 m-6" onClick={()=>setverify(true)} >
        Verify Now
      </button>
    </div>
      <NextEventCountdown event={nextEvent} setclose={setclose}/>
      </div>
  
      <button  style={{marginTop:"3rem", marginLeft:"35.25rem"}} className="w-fitt h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg "  onClick={()=>window.location.href="/events"} >Explore More</button>
    </div>
    
    {!close && <RegisterModal event={nextEvent} onClose={handleClose}/>}
    </>
  )
}
