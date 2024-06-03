import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Card, CardContent, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DialogComponent from '../../Components/Dialog/DialogComponent';
import Router from '../../Router/router';

export const Menu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const [nextPath, setNextPath] = useState('');
  const [examDetails, setExamDetails] = useState({
    name: '',
    type: '',
    totalQuestion: 3,
    totalDuration: '10 minutes'
  });

  const handleNavigation = (path, name, type) => {
    setNextPath(path);
    setExamDetails({ name, type, totalQuestion: 3, totalDuration: '10 minutes' });
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    navigate(nextPath);
  };

  return (
    <Card style={{ margin: theme.spacing(2), backgroundColor: theme.palette.background.default }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ marginRight: theme.spacing(2), color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.appWritingTest, 'Writing Test', 'Writing')}
                  >
                    Writing
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.appReadingTest, 'Reading Test', 'Reading')}
                  >
                    Reading
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ marginRight: theme.spacing(2), color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.appSpeakingTest, 'Speaking Test', 'Speaking')}
                  >
                    Speaking
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
              <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                  <Button
                    color="inherit"
                    style={{ color: theme.palette.customGray.main }}
                    onClick={() => handleNavigation(Router.applisteningTest, 'Listening Test', 'Listening')}
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
    </Card>
  );
};

export default Menu;
