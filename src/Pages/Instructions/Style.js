import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, FormControlLabel } from '@mui/material';

// Estilo para Typography
export const CustomTypography = styled(Typography)(({ theme }) => ({
  
  [theme.breakpoints.down('lg')]: {
    fontSize: '0.80rem',
  },
}));

// Estilo para FormControlLabel
const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('lg')]: {
    '& .MuiFormControlLabel-label': {
      fontSize: '0.80rem',
    },
  },
}));

export const Section = styled('div')(({theme}) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '70px',
    backgroundColor: theme.palette.blueSoft.main,
  }
});

export const ContainerBox = styled('div')(({ needLine }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    flexDirection: 'column',
    position: 'relative', // Necesario para posicionar el pseudo-elemento
    '&::before': needLine
      ? {
          content: '""',
          position: 'absolute',
          right: 0, // Alinea el borde a la derecha
          top: '25%', // Comienza el borde desde el 25% del alto
          height: '50%', // La línea ocupa el 50% del alto
          width: '1px',
          backgroundColor: 'black',
        }
      : {},
  };
});

// Componente CustomFormControlLabel
export const CustomFormControlLabel = (props) => {
  return React.createElement(StyledFormControlLabel, { ...props });
};
