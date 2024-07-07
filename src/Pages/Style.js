import { styled } from "@mui/material/styles";
import { Typography, Button } from '@mui/material';




export const TypograhpyQuestion = styled(Typography)(({ theme }) => {
    return {
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.80rem',
        }
    }
})

export const CustomButtonsActions = styled(Button)(({ theme, color, disabled }) => {

    return {
        display: disabled && 'none',
        color: '#ffffff',
        '& .MuiButton-icon': {
            color: '#ffffff',
        },
        '&:hover': {
            backgroundColor: '#ffffff',
            color: color === 'success' ? theme.palette.success.main : '#ff000099',
            '& .MuiButton-icon': {
                color: color === 'success' ? theme.palette.success.main : '#ff000099',
            },
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.80rem',
        }
    }
})