import React, { useState } from 'react';
import { Checkbox, Container, Paper, Typography, Box, List, ListItem, Grid } from '@mui/material';
import { CustomTypography, CustomFormControlLabel } from './Style'; // Asegúrate de que la ruta de importación sea correcta

export const Instructions = ({ examDetails, onCheckboxChange }) => {
  const [readInstructions, setReadInstructions] = useState(false);

  const handleCheckboxChange = (event) => {
    setReadInstructions(event.target.checked);
    onCheckboxChange(event.target.checked);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, marginBottom: 2 }}>
        <CustomTypography variant="body1" gutterBottom>
          Please read the following instructions carefully
        </CustomTypography>
        <List>
          <ListItem>
            <CustomTypography>
              1. You get an optional 1 minute break at the end of each module.
            </CustomTypography>
          </ListItem>
          <ListItem>
            <CustomTypography>
              2. There is an optional 3 minutes break after the completion of the third module. At that time if you wish to leave the room then please notify the invigilator. The test will automatically continue after the break time expires.
            </CustomTypography>
          </ListItem>
          <ListItem>
            <CustomTypography>
              3. If you wish to take a break or leave the room at any other time during the test, please raise your hands to notify the invigilator, though the timer will not stop for this kind of break.
            </CustomTypography>
          </ListItem>
          <ListItem>
            <CustomTypography>
              4. Do not talk to any one around you or move from your place without permission. If you have any questions raise your hand and the invigilator will come to your seat.
            </CustomTypography>
          </ListItem>
          <ListItem>
            <CustomTypography>
              5. If you have a problem with any question, just note the question on a piece of paper provided and continue. At the end of the test, hand the piece of paper to the invigilator and tell him/her the problem with the question.
            </CustomTypography>
          </ListItem>
          <ListItem>
            <CustomTypography>
              6. All the papers used for rough calculations have to be returned to the invigilator after the test gets over.
            </CustomTypography>
          </ListItem>
          <ListItem>
            <CustomTypography>
              7. Do not use calculators or any other calculating device. Do not use any other paper except the rough papers provided to you.
            </CustomTypography>
          </ListItem>
        </List>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTypography variant="body2"><strong>Name:</strong> {examDetails.name}</CustomTypography>
              <CustomTypography variant="body2"><strong>Type:</strong> {examDetails.type}</CustomTypography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTypography variant="body2"><strong>Total Questions:</strong> {examDetails.totalQuestion}</CustomTypography>
              <CustomTypography variant="body2"><strong>Total Duration:</strong> {examDetails.totalDuration}</CustomTypography>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <CustomFormControlLabel
            control={<Checkbox name="readInstructions" checked={readInstructions} onChange={handleCheckboxChange} />}
            label="I have read instructions carefully"
          />
        </Box>
      </Paper>
    </Container>
  );
};
