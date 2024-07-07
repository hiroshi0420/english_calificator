import { styled } from "@mui/material/styles";
import { Typography, ButtonBase } from '@mui/material';


export const Container = styled(ButtonBase)(({ theme, disabled }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: disabled ? '#d3d3d3' : '#90b2cf',
        height: '250px',
        width: '25%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
        ...(disabled
            ? {}
            : {
                '&:hover': {
                    height: '255px',
                    transform: 'translateY(-5px)',
                    background: theme.palette.primary.main,
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                    '& .icon-container': {
                        background: 'rgba(255, 255, 255, 0.2)',
                    },
                    '& .content-card': {
                        display: 'flex',
                    },
                },
            }),
    };
});

export const CustomTitle = styled(Typography)(() => {
    return {
        fontWeight: 'bold',
        color: '#ffffff',
    }
});

export const Content = styled('div')(({ theme }) => {
    return {
        display: 'none',
        padding: '3px 8px',
        marginTop: '8px',
        borderRadius: '10px',
        background: theme.palette.error.main
    }
});
