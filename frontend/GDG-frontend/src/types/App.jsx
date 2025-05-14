import React from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegistrationForm from '../components/RegistrationForm';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='register/event' element={<RegistrationForm />}/>
      <Route path='contact' element={<Contact />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
