import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Container, FormControlLabel, Paper, Typography, Box, List, ListItem, ListItemText, Grid } from '@mui/material';

export const Instructions = ({ examDetails }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Questions Test
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please read the following instructions carefully
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. You get an optional 1 minute break at the end of each module." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. There is an optional 3 minutes break after the completion of the third module. At that time if you wish to leave the room then please notify the invigilator. The test will automatically continue after the break time expires." />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. If you wish to take a break or leave the room at any other time during the test, please raise your hands to notify the invigilator, though the timer will not stop for this kind of break." />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Do not talk to any one around you or move from your place without permission. If you have any questions raise your hand and the invigilator will come to your seat." />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. If you have a problem with any question, just note the question on a piece of paper provided and continue. At the end of the test, hand the piece of paper to the invigilator and tell him/her the problem with the question." />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. All the papers used for rough calculations have to be returned to the invigilator after the test gets over." />
          </ListItem>
          <ListItem>
            <ListItemText primary="7. Do not use calculators or any other calculating device. Do not use any other paper except the rough papers provided to you." />
          </ListItem>
        </List>
        <Box mt={2}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Name:</strong> {examDetails.name}</Typography>
              <Typography variant="body2"><strong>Type:</strong> {examDetails.type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Total Questions:</strong> {examDetails.totalQuestion}</Typography>
              <Typography variant="body2"><strong>Total Duration:</strong> {examDetails.totalDuration}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <FormControlLabel
            control={<Checkbox name="readInstructions" />}
            label="I have read instructions carefully"
          />
        </Box>
      </Paper>
    </Container>
  )
}

