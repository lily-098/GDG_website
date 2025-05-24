import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import styled from 'styled-components'
import Space from './components/Space'
import About from './pages/About'
import Events from './pages/Events'
import Team from './pages/Team'
import AuthPage from './pages/AuthPage'
import AppContainer from './utils/AppContainer'
import AuthProvider from './contexts/AuthContext'
import AuthCallback from './pages/AuthCallback'

function App() {
  const { theme } = useTheme();

  
  useEffect(() => {
    document.title = "GDG MMMUT - Google Developer Group"
  }, []);

  return (
    <AuthProvider>
      <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
            <Route element={<AppContainer />} >
             <Route path='/' index element={<HomePage />} />
            <Route path='/events' element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path='/team' element={<Team />} />
            
             </Route>
             <Route path='/auth' element={<AuthPage />} />
             <Route path="/auth/callback" element={<AuthCallback/>} />
          </Routes>
    </StyledThemeProvider>
    </AuthProvider>
  )
}

export default App