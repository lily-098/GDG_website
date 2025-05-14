import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
    const [scrolled,setisScroll]=useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [theme,toggleTheme]=useTheme();

    useEffect(()=>{
        const handleScroll=()=>{
            if (window.scrollY>10){
                setisScroll(true);
            }
            else{
                setisScroll(false);
            }
            
            }
            window.addEventListener('scroll',handleScroll);
            return()=>{
                window.removeEventListener('scroll',handleScroll);
        }
    },[])
  return (
    <nav  className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}>
        <div>
            {/* Logo */}
            <div>
                <span>GDG</span>
                <span>MMMUT</span>
            </div>
        </div>
    </nav>
  )
}
