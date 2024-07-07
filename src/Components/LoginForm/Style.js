import { styled } from "@mui/material/styles";
import { Typography, OutlinedInput } from '@mui/material';


export const Header = styled('div')(() => {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.70rem',
        flexDirection: 'column',
        marginBottom: '1rem',
    }
});

export const CustomTypography = styled(Typography)(({ theme, needBold }) => {
    return {
        fontWeight: needBold && 'bold',
        color: theme.palette.primary.main
    }
})

export const Container = styled('div')(() => {
    return {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '5rem',
    }
})

export const Form = styled('form')(() => {
    return {
        display: 'flex',
        width: '400px',
        flexDirection: 'column',
    }
});

export const ImgLogo = styled('img')(() => {
    return {
        width: '220px',
        height: '110px',
    }
})

export const CustomOutlinedInput = styled(OutlinedInput)(() => {
    return {
        fontSize: '0.8rem',
        '& .MuiInputBase-input::placeholder': {
            fontSize: '0.8rem', // Ajusta el tamaño del texto del placeholder aquí
        },
    }
})