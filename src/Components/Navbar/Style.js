import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
const drawerWidth = 240;

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
    padding: '5px 20px 5px 20px',
    backgroundColor: theme.palette.primary.main,
  }));

export const Img = styled('img')(() => {
    return {
        width: '100%',
        height: '100%',
    }
})

export const ContainerImage = styled('div')(() => {
    return {
        width: '50px',
        height: '50px',
        backgroundColor: 'white',
        padding: '5px',
        borderRadius: '50%'
    }
})