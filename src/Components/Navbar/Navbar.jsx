
// MUI Components
import { Toolbar, Typography } from '@mui/material';
// Custom Components
import { AppBar, Img, ContainerImage } from './Style';
import LogoNav from '../../../public/Logo.png';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <ContainerImage>
          <Img src={LogoNav}  alt='Logo navbar'/>
        </ContainerImage>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          TEST DE CONOCIMIENTO
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar