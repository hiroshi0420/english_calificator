import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Paper, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons
import DrawIcon from '@mui/icons-material/Draw'; // Writing
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // reading
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode'; // speaking
import HeadphonesIcon from '@mui/icons-material/Headphones'; // Listening

import { QuestionApi } from '../../Services/QuestionsApi';

import { TestContext } from '../../Context/TestProvider';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';

const iconMapping = {
  Listening: HeadphonesIcon,
  Reading: AutoStoriesIcon,
  Speaking: InterpreterModeIcon,
  Writing: DrawIcon,
};

export const ResultsTest = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const questionApi = new QuestionApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { setCompletedTests } = useContext(TestContext);

  const loadResults = async () => {
    try {
      const result = await questionApi.getResultsTest();
      console.log('result from API:', result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

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

  if (loading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <div>No results found.</div>;
  }

  return (
    <Paper sx={{ padding: '30px' }}>
      <Container>
        <Grid>
          <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottom: `4px solid ${theme.palette.primary.main}` }}>
            <Box>
              <Typography variant="h4" gutterBottom fontWeight={'bold'} fontSize={'1.5rem'}>
                Test Results
              </Typography>
              <Typography variant="h6" fontSize={'0.80rem'}>
                <span style={{ fontWeight: 'bold' }}>Total Evaluated Sections:</span> {data?.totalEvaluatedSections}
              </Typography>
              <Typography variant="h6" fontSize={'0.80rem'}>
                <span style={{ fontWeight: 'bold' }}>Score Percentage:</span> {data?.scorePercentage}%
              </Typography>
            </Box>

            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} padding={'15px'} borderRadius={'5px'} bgcolor={theme.palette.primary.main}>
              <Typography fontWeight={'bold'} color={theme.palette.background.default}>
                English Level
              </Typography>
              <Typography fontSize={'3rem'} color={theme.palette.background.default}>
                {data?.englishLevel}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid container spacing={2} mt={1} justifyContent="center">
          {data?.resultDetails?.slice(0, 4).map((detail, index) => {
            const IconComponent = iconMapping[detail.testName];
            return (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card sx={{ display: 'flex', alignItems: 'center', maxWidth: 600, borderBottom: `4px solid ${theme.palette.primary.main}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 140, height: 140 }}>
                    <IconComponent style={{ fontSize: 64 }} />
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {detail.testName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <span style={{ fontWeight: 'bold' }}>Score Percentage:</span> {detail.scorePercentage}%
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <span style={{ fontWeight: 'bold' }}>English Level:</span> {detail.englishLevel}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <BackDropComponent open={open}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleReset}>
            Back to menu
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};
