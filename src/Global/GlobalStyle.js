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
    overflow-x: hidden;
    overflow-y: auto;
  }

  #root {
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
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

  /* Estilos personalizados para la barra de desplazamiento */
  * {
    &::-webkit-scrollbar {
      width: 4px; /* Controla el ancho de la barra de desplazamiento para Chrome, Safari y Edge */
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1; /* Color de fondo de la pista de la barra de desplazamiento */
    }

    &::-webkit-scrollbar-thumb {
      background: ${colors.blueDark}; /* Color de fondo del control deslizante de la barra de desplazamiento */
    }

    &::-webkit-scrollbar-thumb:hover {
      background: '#555'; /* Color de fondo del control deslizante de la barra de desplazamiento cuando se pasa el mouse */
    }
  }

  @media (max-width: ${theme.breakpoints.values.lg}px) {
    ::placeholder {
      font-size: 0.80rem; /* Tamaño cuando la pantalla es menor que lg */
    }
  }
`;