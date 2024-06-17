import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Button, Card, CardContent, Grid, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DialogComponent from '../../Components/Dialog/DialogComponent';
import Router from '../../Router/router';
import { TestContext } from '../../Context/TestProvider';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // Reading
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'; // Listening
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode'; // Speaking
import ArticleIcon from '@mui/icons-material/Article'; // Writing

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
            <ButtonBase
              onClick={() => handleNavigation(Router.appWritingTest, 'Writing Test', 'Writing')}
              disabled={completedTests.writing}
              style={{ width: '100%' }}
            >
              <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper, width: '100%' }}>
                <AppBar position="static" style={{ backgroundColor: completedTests.writing ? '#d3d3d3' : theme.palette.primary.main }}>
                  <Toolbar>
                    <Button
                      color="inherit"
                      startIcon={<ArticleIcon />}
                      style={{ marginRight: theme.spacing(2), color: theme.palette.customGray.main, justifyContent: 'flex-start' }}
                      disabled={completedTests.writing}
                    >
                      Writing
                    </Button>
                  </Toolbar>
                </AppBar>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} md={6}>
            <ButtonBase
              onClick={() => handleNavigation(Router.appReadingTest, 'Reading Test', 'Reading')}
              disabled={completedTests.reading}
              style={{ width: '100%' }}
            >
              <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper, width: '100%' }}>
                <AppBar position="static" style={{ backgroundColor: completedTests.reading ? '#d3d3d3' : theme.palette.primary.main }}>
                  <Toolbar>
                    <Button
                      color="inherit"
                      startIcon={<AutoStoriesIcon />}
                      style={{ color: theme.palette.customGray.main, justifyContent: 'flex-start' }}
                      disabled={completedTests.reading}
                    >
                      Reading
                    </Button>
                  </Toolbar>
                </AppBar>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} md={6}>
            <ButtonBase
              onClick={() => handleNavigation(Router.appSpeakingTest, 'Speaking Test', 'Speaking')}
              disabled={completedTests.speaking}
              style={{ width: '100%' }}
            >
              <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper, width: '100%' }}>
                <AppBar position="static" style={{ backgroundColor: completedTests.speaking ? '#d3d3d3' : theme.palette.primary.main }}>
                  <Toolbar>
                    <Button
                      color="inherit"
                      startIcon={<InterpreterModeIcon />}
                      style={{ marginRight: theme.spacing(2), color: theme.palette.customGray.main, justifyContent: 'flex-start' }}
                      disabled={completedTests.speaking}
                    >
                      Speaking
                    </Button>
                  </Toolbar>
                </AppBar>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} md={6}>
            <ButtonBase
              onClick={() => handleNavigation(Router.applisteningTest, 'Listening Test', 'Listening')}
              disabled={completedTests.listening}
              style={{ width: '100%' }}
            >
              <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper, width: '100%' }}>
                <AppBar position="static" style={{ backgroundColor: completedTests.listening ? '#d3d3d3' : theme.palette.primary.main }}>
                  <Toolbar>
                    <Button
                      color="inherit"
                      startIcon={<HeadsetMicIcon />}
                      style={{ color: theme.palette.customGray.main, justifyContent: 'flex-start' }}
                      disabled={completedTests.listening}
                    >
                      Listening
                    </Button>
                  </Toolbar>
                </AppBar>
              </Card>
            </ButtonBase>
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
