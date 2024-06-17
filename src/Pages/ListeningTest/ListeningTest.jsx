import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import { Paper, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
// Components
import { PageTitle } from '../../Components/PageTitle/PageTitle';
import { HeaderSection } from '../../Components/Header/HeaderSection';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// Styles
import { SectionPageTitle, ContainerQuestion, ContainerContent, CustomTyphography, Container, CustomSendIcon, ContainerOptions } from './Style';
// API
import { QuestionApi } from '../../Services/QuestionsApi';

import { TestContext } from '../../Context/TestProvider';

import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';

export const ListeningTest = () => {
  const navigate = useNavigate();
  const { completedTests, setCompletedTests } = useContext(TestContext);
  const questionApi = new QuestionApi();

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [audioBase64, setAudioBase64] = useState('');

  const progress = ((currentQuestionIndex + 1) / (data?.length || 1)) * 100;

  const loadQuestions = async () => {
    try {
      let response = await questionApi.getListeningTest();
      if (response.status === 200) {
        let resp = response.data;
        setData(resp);
        setResponses(resp.map(() => ({ response: '' })));
        setAudioBase64(resp[0].audioAsBase64);  // Set initial audio
      } else {
        console.error('Error al cargar preguntas:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const sendAnswer = async () => {
    try {
      console.log('allResponses', responses);

      let response = await questionApi.sendWritingTest(responses);
      if (response.status === 200) {
        let resp = response.data;
        console.log('Respuestas enviadas:', resp);
      } else {
        console.error('Error al enviar respuestas:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < data?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAudioBase64(data[currentQuestionIndex + 1].audioAsBase64);  // Update audio for next question
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAudioBase64(data[currentQuestionIndex - 1].audioAsBase64);  // Update audio for previous question
    }
  };

  const handleOptionChange = (index, option) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = { response: option };
    setResponses(updatedResponses);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    setOpen(true);
    // sendAnswer();
    const allTestsCompleted = {
      ...completedTests,
      listening: true,
    };
    setCompletedTests(allTestsCompleted);

    const allCompleted = Object.values(allTestsCompleted).every(test => test === true);
    setOpen(false);
    if (allCompleted) {
      navigate('/results');
    } else {
      navigate('/menu');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <SectionPageTitle>
        <PageTitle title='Listening Test' icon={<HeadsetMicIcon />} />
      </SectionPageTitle>
      <HeaderSection
        formatTime={formatTime}
        timeLeft={timeLeft}
        progress={progress}
        totalMarks={`${currentQuestionIndex + 1}/${data?.length}`}
      />
      <Paper elevation={0} sx={{ padding: '0 24px 24px' }}>
        <Box>
          <Box>
            <ContainerQuestion>
              <ContainerContent numberQuestion={true}>
                <IconButton>
                  <VolumeUpIcon />
                </IconButton>
              </ContainerContent>
              <ContainerContent>
                <CustomTyphography variant="body1" align="left">
                  {String(currentQuestionIndex + 1).padStart(2, '0')}. {data?.[currentQuestionIndex]?.questionSet[currentQuestionIndex]?.question}
                </CustomTyphography>
              </ContainerContent>
            </ContainerQuestion>

            <audio controls src={`data:audio/mp3;base64,${audioBase64}`} style={{ height: '30px'}}/>

            <ContainerOptions>
              {data?.[currentQuestionIndex]?.questionSet[currentQuestionIndex]?.options.map((option, index) => (
                <Button
                  variant={responses[currentQuestionIndex]?.response === option ? "contained" : "outlined"}
                  onClick={() => handleOptionChange(currentQuestionIndex, option)}
                  disableElevation
                  fullWidth
                  key={`${currentQuestionIndex}-${index}`}
                >
                  <CustomTyphography align='left'>{option}</CustomTyphography>
                </Button>
              ))}
            </ContainerOptions>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Button
                  sx={{ fontSize: isLgDown && '0.80rem', height: '25px', width: '150px' }}
                  variant='outlined'
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                >
                  Back
                </Button>
                {currentQuestionIndex === data?.length - 1 ? (
                  <Button
                    variant='contained'
                    color='warning'
                    endIcon={<CustomSendIcon />}
                    sx={{ fontSize: isLgDown && '0.80rem', height: '25px', width: '150px' }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    sx={{ fontSize: isLgDown && '0.80rem', height: '25px', width: '150px' }}
                    onClick={handleNext}
                    disabled={currentQuestionIndex === data?.length - 1}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <BackDropComponent open={open}/>
      </Paper>
    </Container>
  );
};
