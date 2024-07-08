import { styled } from "@mui/material/styles";
import { Typography, Box } from '@mui/material';


export const CustomSubtitle = styled(Typography)(({theme}) => {
    return {
        color: 'black',
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.80rem',
        },
    }
})

export const CustomBox = styled(Box)(({theme}) => {
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        [theme.breakpoints.down('lg')]: {
        }
    }
})

export const Section = styled('div')(() => {
    return {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px',
    }
});

export const ContainerTitle = styled('div')(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export const ContainerBack = styled('div')(() => {
    return {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export const Container = styled('div')(() => {
    return {
        padding: '24px',
    }
});

export const ContainerIconMap = styled('div')(() => {
    return {
        width: '30%',
        display: 'flex',
        padding: '24px',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    }
});

export const ContainerContent = styled('div')(() => {
    return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.50rem',
    }
});