import { styled } from "@mui/material/styles";
import { DialogContent } from '@mui/material';

export const CustomDialogComtent = styled(DialogContent)(({ theme }) => {
    return {
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






