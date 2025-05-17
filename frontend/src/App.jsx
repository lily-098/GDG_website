import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import styled from 'styled-components'
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
            {/* Add more routes as needed */}
          </Routes>
        </Main>
        <Footer />
      </AppContainer>
    </StyledThemeProvider>
  )
}

export default App