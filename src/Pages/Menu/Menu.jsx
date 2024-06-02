import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Instructions } from '../Instructions/Instructions';

const Router = {
  appLogin: '/login',
  appMenu: '/menu',
  appWritinTest: '/writinTest',
  appReadingTest: '/readingTest',
  appSpeakingTest: '/spekingTest',
  applisteningTest: '/listeningTest',
  appInstructions: '/instructions',
  apiBaseUrl: 'http://localhost:5000',
  apiWritingTest: '/api/Writing',
};

export const Menu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const [nextPath, setNextPath] = useState('');

  const handleNavigation = (path) => {
    setNextPath(path);
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
                    onClick={() => handleNavigation(Router.appWritinTest)}
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
                    onClick={() => handleNavigation(Router.appReadingTest)}
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
                    onClick={() => handleNavigation(Router.appSpeakingTest)}
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
                    onClick={() => handleNavigation(Router.appllisteningTest)}
                  >
                    Listening
                  </Button>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog open={showInstructions} onClose={() => setShowInstructions(false)} maxWidth={200}>
        <DialogTitle>Instructions</DialogTitle>
        <DialogContent>
          <Instructions/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInstructions} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Menu;
