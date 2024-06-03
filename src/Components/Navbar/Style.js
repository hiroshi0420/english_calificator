import { styled, alpha } from "@mui/material/styles";
import { InputBase, Toolbar } from '@mui/material';
import MuiAppBar from "@mui/material/AppBar";

export const ContainerNavbar = styled('div')(({ theme }) => {
  return {
    backgroundColor: theme.palette.primary.main,
    height: '8%',
    width: '100%'
  }
})

export const CustomToolbar = styled(Toolbar)(({theme}) => {
  return {
    height: '100%',
    [theme.breakpoints.down('lg')]: {
        minHeight: 'unset', 
        // Search Bar
        '& .MuiInputBase-input': {
          height: '0.80rem',
        },
        '& .MuiTypography-root': {
          fontSize: '1rem',
        }
    },
  } 
})

export const Search = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }
})

export const SearchIconWrapper = styled('div')(({ theme }) => {
  return {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export const StyledInputBase = styled(InputBase)(({ theme }) => {
  return {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      width: '20ch',
      [theme.breakpoints.down('lg')]: {
        '&::placeholder': {
          fontSize: '0.80rem',
        },
      },
    },
  }
})