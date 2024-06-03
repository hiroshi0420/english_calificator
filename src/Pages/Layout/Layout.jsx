import { Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { ContainerContent } from './Style';


export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ContainerContent id='containerContet'>
        {children}
      </ContainerContent>
    </>
  )
}
