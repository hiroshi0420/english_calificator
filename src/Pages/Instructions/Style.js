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
  [theme.breakpoints.down('lg')]: {
    '& .MuiFormControlLabel-label': {
      fontSize: '0.80rem',
    },
  },
}));

// Componente CustomFormControlLabel
export const CustomFormControlLabel = (props) => {
  return React.createElement(StyledFormControlLabel, { ...props });
};
