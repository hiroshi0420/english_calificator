import React from 'react'
import { } from './Style';
import { ThemeProvider, CssBaseline, Grid, } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { Drawer } from '../../Components/Sidebar/Style';
import { theme } from '../../Global/GlobalStyle';


export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ margin: 0, padding: 0 }}>
        <CssBaseline />
        <Navbar sx={{backgroundColor:"red"}}/>
        <Grid>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
