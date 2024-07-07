// import { createTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';


const colors = Object.freeze({
    blueDark: '#0A4BA0',
    blueLight: '#3389E5',
    grayLight: '#f4F5F9',
    // green: '#76C15D',
    green: '#4eb734',
    // red: '#EE3962',
    red: '#982023',
    orange: '#ff9800',
    grayBold: '#92A4C8',
    customGray: '#f0f0f0',
    blueSoft: '#d3dfee', // Agregar color personalizado aquí
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
          second: colors.greenHard,
      },
      background: {
          default: colors.grayLight,
      },
      customGray: {
          main: colors.grayBold, // Usar color personalizado aquí
      },
      blueSoft: {
        main: colors.blueSoft, 
      },
      customColors: {
        greenHard: colors.greenHard,
      }

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
      MuiTab: {
          styleOverrides: {
              root: {
                  height: '100%',
                  fontSize: "0.80rem",
                  color: colors.grayLight, // Color de la letra por defecto
                  '&.Mui-selected': {
                      color: colors.grayLight, // Color de la letra cuando está activo
                  },
              },
          },
      },
      MuiTabs: {
          styleOverrides: {
              indicator: {
                  backgroundColor: colors.grayLight, // Color del indicador cuando el tab está activo
              },
              root: {
                height: '100%', // Ocupa el 100% de la altura del contenedor padre
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
    background-color: #ffffff; 
    height: 100vh;
    margin: 0 auto;
    overscroll-behavior: none;
    width: 100vw;
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