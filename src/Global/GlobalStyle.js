import { createTheme } from '@mui/material';

const colors = Object.freeze({
    blueDark: '#003366',
    blueLight: '#0073e6',
    grayLight: '#f4f4f4',
    green: '#4CAF50',
    red: '#f44336',
    orange: '#ff9800',
    grayBold: '#f0f0f0',
    customGray: '#f0f0f0' // Agregar color personalizado aquí
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
            // main: colors.blueLight,

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
        customGray: {
            main: colors.customGray, // Usar color personalizado aquí
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
            'Material Icons'
        ].join(','),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedWarning: {
                    color: '#FFFFFF', // Texto blanco
                },
            },
        },
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

export const globalStyles = `
  html {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: ${colors.grayBold}; 
    height: 100vh;
    margin: 0 auto;
    overscroll-behavior: none;
    width: 100%;
  }

  #root {
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    overflow-x: hidden;
    min-height: 100vh;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    outline: 0; 
    border: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  body, input, button {
    font-family: 'Poppins', sans-serif;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  select {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    font-weight: 400;
  }

  textarea {
    font-family: 'Poppins', sans-serif;
  }
`;
