import { styled } from "@mui/material/styles";
import { TextField as MuiTextField } from '@mui/material';

export const Container = styled('div')(({ theme }) => {
    return {
        paddingBottom: '16px',
        '& .MuiInputBase-input': {
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
                background: theme.palette.primary.main,  // Color de fondo del control deslizante de la barra de desplazamiento cuando se pasa el mouse
            },
        },
    }
})

export const Textfield = styled(MuiTextField)(() => {
    return {
        width: '100%',
        backgroundColor: '#fff',
    }
})