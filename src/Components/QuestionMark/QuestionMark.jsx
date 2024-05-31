import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';

export function QuestionMark() {
  // Simulación de los estados de las preguntas
  const questions = Array.from({ length: 37 }, (_, index) => {
    const id = index + 1;
    let status;
    if ([1, 5, 9].includes(id)) status = 'marked';
    else if ([2, 6, 10].includes(id)) status = 'answered';
    else if ([3, 7, 11].includes(id)) status = 'notAnswered';
    else status = 'notAttempted';
    return { id, status };
  });

  // Función para obtener el color según el estado de la pregunta
  const getStatusColor = (status) => {
    switch (status) {
      case 'marked':
        return 'purple';
      case 'answered':
        return 'green';
      case 'notAnswered':
        return 'grey';
      case 'notAttempted':
        return 'white';  // Asumiendo que "not attempted" es blanco
      default:
        return 'none';
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Question Marks
        </Typography>
        <Grid container spacing={1}>
          {/* {questions.map((question) => ( */}
            <Grid item xs={3}>
              <Box
                sx={{
                  width: 25,
                  height: 25,
                //   bgcolor: getStatusColor(question.status),
                  bgcolor: 'yellow',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ccc'
                }}
              >
                <Typography variant="caption" sx={{ color: 'black' }}>
                  {/* {question.id} */}
                  1
                </Typography>
              </Box>
            </Grid>
          {/* ))} */}
        </Grid>
      </Paper>
    </Box>
  );
}

