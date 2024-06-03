import { styled } from "@mui/material/styles";
import { Box, Paper } from '@mui/material';


export const ContainerContent = styled('div')(({ theme }) => {
    return {
        padding: '16px 40px',
        width: '100%',
        height: '92%',
        '&::-webkit-scrollbar': {
            width: '4px',  // Controla el ancho de la barra de desplazamiento para Chrome, Safari y Edge
        },
        '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',  // Color de fondo de la pista de la barra de desplazamiento
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,  // Color de fondo del control deslizante de la barra de desplazamiento
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',  // Color de fondo del control deslizante de la barra de desplazamiento cuando se pasa el mouse
        },
    }
})

export const CustomPaper = styled('div')(() => {
    return {
        width: '100%',
        height: '100%',
        margin: '16px 16px 16px 16px'
    }
})

export const ContainerNav = styled('div')(() => {
    return {
        width: '100%',
        height: '8%',
    }
})