import { styled } from "@mui/material/styles";
import { Typography, Box } from '@mui/material';


export const CustomSubtitle = styled(Typography)(({theme}) => {
    return {
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
        width: '140px',
        height: '140px',
        [theme.breakpoints.down('lg')]: {
            height: '115px',
        }
    }
})