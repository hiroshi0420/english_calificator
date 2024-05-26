import { createTheme } from '@mui/material';

const colors = Object.freeze({
    blueDark: '#003366',
    blueLight: '#0073e6',
    grayLight: '#f4f4f4',
    green: '#4CAF50',
    red: '#f44336',
    orange: '#ff9800'
});

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 425,
            md: 769,
            lg: 1440,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: colors.blueDark,
        },
        secondary: {
            main: colors.blueLight,
        },
        error: {
            main: colors.red,
        },
        warning: {
            main: colors.orange,
        },
        info: {
            main: colors.blueLight,
        },
        success: {
            main: colors.green,
        },
        background: {
            default: colors.grayLight,
        },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
            'Material Icons'
        ].join(','),
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: colors.red,
                    "&$error": {
                        color: colors.red,
                    },
                },
            },
        },
    },
});
