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
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const Main = styled.main`
  flex: 1;
`;

function App() {
  const { theme } = useTheme();

  // Add dynamic title with site name
  useEffect(() => {
    document.title = "GDG MMMUT - Google Developer Group"
  }, []);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/events' element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path='/team' element={<Team />} />
     
          </Routes>
        </Main>
        <Space />
        <Footer />
        
      </AppContainer>
    </StyledThemeProvider>
  )
}

export default App