import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CircularProgress, Paper, Box, useTheme, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// Styles
import { CustomSubtitle, CustomBox, Section, ContainerTitle, ContainerBack, Container, ContainerIconMap, ContainerContent } from './Style';
import { CustomButtonsActions } from '../Style';

// Icons
import DrawIcon from '@mui/icons-material/Draw'; // Writing
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // Reading
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode'; // Speaking
import HeadphonesIcon from '@mui/icons-material/Headphones'; // Listening


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from '@mui/material/Link';

import { QuestionApi } from '../../Services/QuestionsApi';

import { TestContext } from '../../Context/TestProvider';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';

const iconMapping = {
  writing: DrawIcon,
  reading: AutoStoriesIcon,
  speaking: InterpreterModeIcon,
  listening: HeadphonesIcon,
};

export const ResultsTest = () => {
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const questionApi = new QuestionApi();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { setCompletedTests, respTest } = useContext(TestContext);
  console.log('respTest', respTest);

  const handleReset = () => {
    setOpen(true);
    setCompletedTests({
      writing: false,
      reading: false,
      speaking: false,
      listening: false,
    });
    setTimeout(() => {
      navigate('/menu');
      setOpen(false);
    }, 1000);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  if (!respTest || respTest.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <Container>
      <Grid>
        <Section>
          <ContainerBack>
            <ArrowBackIosIcon sx={{ fontSize: '12px' }}/>
            <Link underline="none" sx={{ fontSize: '12px', cursor: 'pointer'}} onClick={handleReset}>Back to home</Link>
          </ContainerBack>

          <ContainerTitle>
            <Typography variant="h4" gutterBottom fontWeight={'bold'} fontSize={'1.5rem'}>
              Test Results
            </Typography>
            <Typography variant="h6" fontSize={'0.80rem'}>
              <span style={{ fontWeight: 'bold' }}>Total Evaluated Sections:</span> {respTest.length}
            </Typography>
          </ContainerTitle>
          <Box></Box>
        </Section>
      </Grid>
      {respTest.map((testResult, index) => {
        const IconComponent = iconMapping[testResult.test.toLowerCase()];
        return (
          <Box key={index} my={2} sx={{ borderBottom: `4px solid ${theme.palette.primary.main}` }}>
            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <ContainerIconMap>
                <CustomBox>
                  <Typography variant="h5" fontWeight='bold' sx={{ color: theme.palette.primary.main}}>
                    {capitalizeFirstLetter(testResult.test)}
                  </Typography>
                </CustomBox>
                <ContainerContent>
                  <IconComponent style={{ fontSize: 40, color: theme.palette.primary.main }} />
                  <div>
                    <Typography variant='caption'>English Level:</Typography>
                    <CustomSubtitle variant="body2" fontWeight='bold' color="textSecondary">
                      {testResult.data?.englishLevel}
                    </CustomSubtitle>
                  </div>
                </ContainerContent>
              </ContainerIconMap>
              <TableContainer component={Paper} sx={{ width: '100%' }}>
                {testResult.test.toLowerCase() === 'listening' ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>English Level</TableCell>
                        <TableCell>Correct Answers</TableCell>
                        <TableCell>Incorrect Answers</TableCell>
                        <TableCell>Total Questions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{testResult.data?.englishLevel}</TableCell>
                        <TableCell>{testResult.data?.correctAnswers}</TableCell>
                        <TableCell>{testResult.data?.incorrectAnswers}</TableCell>
                        <TableCell>{testResult.data?.totalQuestions}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Justification</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {testResult.data.responseDetails?.map((detail, detailIndex) => (
                        <TableRow key={detailIndex}>
                          <TableCell>{detailIndex + 1}</TableCell>
                          <TableCell>{detail.level}</TableCell>
                          <TableCell>{detail.justification}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Card>
          </Box>
        );
      })}
      <BackDropComponent open={open} />
    </Container>
  );
};
