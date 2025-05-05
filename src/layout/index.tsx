import React, { useState } from 'react'
import { Button, ChangeTheme, ContainerMain } from './styles'
import AppRoutes from '../routes'
import Header from '../components/header'
import { FiSun, FiMoon } from 'react-icons/fi'
import { darkTheme } from '../styles/stitches.config'
import Footer from '../components/footer'


const Layout: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <>

      <ContainerMain>
        <ChangeTheme className={darkMode ? darkTheme : ''}>
          <Header>
            <Button onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? <FiSun color="#fbbf24" /> : <FiMoon color="#1f2937" />}
            </Button>
          </Header>
          <AppRoutes />
          <Footer />
        </ChangeTheme>
      </ContainerMain>

    </>
  )
}

export default Layout
