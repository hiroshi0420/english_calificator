import MuiAppBar from "@mui/material/AppBar";
import { Typography } from '@mui/material';
import { styled} from "@mui/material/styles";
const drawerWidth = 240;



export const Section = styled('div')(({theme}) => {
  return {
    background: theme.palette.background.default,
    width: '100vw',
    height: '50vh'
  }
})

export const Container = styled('div')(({theme}) => {
  return {
    position: 'relative',
    paddingLeft: '10rem',
    paddingRight: '10rem',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }
});

export const ContainerLeft = styled('div')(({theme}) => {
  return {
    width: '70%',
    padding: '5rem 5rem 5rem 0',
    [theme.breakpoints.down('lg')]: {
      padding: '3rem 3rem 3rem 0',
    }
  }
});

export const ContainerRight = styled('div')(({theme}) => {
  return {
    width: '30%',
    height: '100%',
  }
});

export const ImgSection = styled('img')(({theme}) => {
  return {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  }
});

export const TitleHome = styled(Typography)(({theme, needMargin}) => {
  return {
    marginBottom: needMargin && '6px',
    [theme.breakpoints.down('lg')]:{
      fontSize: '1.5rem',
    }
  }
})

export const SectionCategories = styled('div')(() => {
  return {
    position: 'absolute',
    top: '40vh',
    width: '65%',
    height: 'auto',
    marginBottom: '20px',
  }
});

export const ContainerCards = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  }
});


export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));