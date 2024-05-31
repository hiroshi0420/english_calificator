import React from 'react'
import { ThemeProvider, CssBaseline, Box, Paper} from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { Drawer } from '../../Components/Sidebar/Style';
import { theme } from '../../Global/GlobalStyle';
import { ContainerNav, ContainerContent } from './Style';
import CustomizedSteppers from '../../Components/Stepper/Stepper';


export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <CssBaseline />
        <ContainerNav>
          <Navbar/>
        </ContainerNav>
        <ContainerContent id='containerContet'>
            {children}
        </ContainerContent>
      </Box>
    </ThemeProvider>
  )
}
