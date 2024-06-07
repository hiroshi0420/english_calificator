import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Button, Card, CardContent, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DialogComponent from '../../Components/Dialog/DialogComponent';
import Router from '../../Router/router';
import { TestContext } from '../../Context/TestProvider';
import {BackDropComponent} from '../../Components/BackDrop/BackDropComponet';

export const Menu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const [nextPath, setNextPath] = useState('');
  const [open, setOpen] = useState(false); // Estado para el Backdrop
  const [examDetails, setExamDetails] = useState({
    name: '',
    type: '',
    totalQuestion: 3,
    totalDuration: '10 minutes'
  });
  const { completedTests } = useContext(TestContext);

  const handleNavigation = (path, name, type) => {
    setNextPath(path);
    setExamDetails({ name, type, totalQuestion: 3, totalDuration: '10 minutes' });
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    setOpen(true); // Mostrar el Backdrop
    setTimeout(() => {
      setOpen(false); // Ocultar el Backdrop
      navigate(nextPath); // Redirigir al examen seleccionado
    }, 2000); // Simulando una espera de 2 segundos antes de redirigir
  };

  return (
    <Card style={{ margin: theme.spacing(2), backgroundColor: theme.palette.background.default }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: completedTests.writing ? '#d3d3d3' : theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ marginRight: theme.spacing(2), color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.appWritingTest, 'Writing Test', 'Writing')}
                    disabled={completedTests.writing}
                  >
                    Writing
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: completedTests.reading ? '#d3d3d3' : theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.appReadingTest, 'Reading Test', 'Reading')}
                    disabled={completedTests.reading} // Deshabilitar botón si la prueba está completada
                  >
                    Reading
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: completedTests.speaking ? '#d3d3d3' : theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ marginRight: theme.spacing(2), color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.appSpeakingTest, 'Speaking Test', 'Speaking')}
                    disabled={completedTests.speaking} // Deshabilitar botón si la prueba está completada
                  >
                    Speaking
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: completedTests.listening ? '#d3d3d3' : theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.applisteningTest, 'Listening Test', 'Listening')}
                    disabled={completedTests.listening} // Deshabilitar botón si la prueba está completada
                  >
                    Listening
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
        </Grid>
      </CardContent>

      <DialogComponent
        examDetails={examDetails}
        nextPath={nextPath}
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
        handleCloseInstructions={handleCloseInstructions}
      />

      <BackDropComponent open={open} />
    </Card>
  );
};

export default Menu;
