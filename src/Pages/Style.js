import { styled } from "@mui/material/styles";
import { Typography, Button } from '@mui/material';




export const TypograhpyQuestion = styled(Typography)(({theme}) => {
    return {
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.80rem',
        }
    }
})

export const CustomButtonsActions = styled(Button)(({theme}) => {
    return {
        [theme.breakpoints.down('lg')]: {
            fontSize: '0.80rem',
        }
    }
})