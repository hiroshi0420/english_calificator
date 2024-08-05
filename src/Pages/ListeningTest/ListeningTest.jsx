import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import { Paper, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
// Components
import { PageTitle } from '../../Components/PageTitle/PageTitle';
import { HeaderSection } from '../../Components/Header/HeaderSection';
// Styles
import { SectionPageTitle, ContainerQuestion, ContainerContent, CustomTyphography, Container, CustomSendIcon, ContainerOptions } from './Style';
import { TypograhpyQuestion } from '../Style';
// API
import { QuestionApi } from '../../Services/QuestionsApi';
import { TestContext } from '../../Context/TestProvider';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';

export const ListeningTest = () => {
  const navigate = useNavigate();
  const { completedTests, setCompletedTests, setRespTest } = useContext(TestContext);
  const questionApi = new QuestionApi();

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [audioBase64, setAudioBase64] = useState('');
  const idTest = JSON.parse(localStorage.getItem('test'));

  const progress = ((currentQuestionIndex + 1) / (data?.[0]?.questionSet?.length || 1)) * 100;

  const loadQuestions = async () => {
    try {
      let response = await questionApi.getListeningTest();
      if (response.status === 200) {
        let resp = response.data;
        setData(resp);
        setResponses(resp[0].questionSet.map(() => ({ userAnswer: '' })));
        setAudioBase64(resp[0].audioAsBase64);
  
        // Inicializar allResponses con un solo objeto
        setAllResponses([
          {
            testId: idTest[0]?.id,
            listeningQuestionId: resp[0].id,
            userAnswer: JSON.stringify({ answers: [] }), // Inicializar el userAnswer como un JSON vacío
            scorePercentage: 0, // Inicializar el puntaje en 0
          },
        ]);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  const sendAnswer = async () => {
    try {
      let response = await questionApi.sendListeningTest(allResponses);
      if (response.status === 200) {
        let resp = response.data;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < data?.[0]?.questionSet?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (questionIndex, selectedOption) => {
    const correctOptionIndex = data[0].questionSet[questionIndex].correctOptionIndex - 1;
    const correctAnswer = data[0].questionSet[questionIndex].options[correctOptionIndex];
  
    const scorePercentage = selectedOption === correctAnswer ? 25 : 0;
  
    setAllResponses((prev) => {
      const currentResponse = prev[0]; // Obtener el único objeto en el array
  
      // Asegurarse de que userAnswer esté inicializado como un string JSON válido
      const userAnswerJson = currentResponse.userAnswer ? JSON.parse(currentResponse.userAnswer) : { answers: [] };
  
      const newAnswer = {
        id: data[0].questionSet[questionIndex].id,
        userAnswer: selectedOption,
        correctAnswer: correctAnswer,
        scorePercentage: scorePercentage,
      };
  
      const updatedAnswers = userAnswerJson.answers || [];
      updatedAnswers[questionIndex] = newAnswer; // Reemplazar o agregar la respuesta en la posición correcta
  
      const newScorePercentage = currentResponse.scorePercentage + scorePercentage;
  
      return [
        {
          ...currentResponse,
          userAnswer: JSON.stringify({ answers: updatedAnswers }),
          scorePercentage: newScorePercentage,
        },
      ];
    });
  
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = { response: selectedOption };
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

  useEffect(() => {
    if (data) {
      setAudioBase64(data[0].audioAsBase64);  // Update audio whenever data changes
    }
  }, [data]);

  const calculateTotalScorePercentage = () => {
    return allResponses.reduce((total, response) => total + response.scorePercentage, 0);
  };

  const handleSubmit = () => {
    const totalScorePercentage = calculateTotalScorePercentage();
    setAllResponses((prev) =>
      prev.map((response) => ({
        ...response,
        scorePercentage: totalScorePercentage,
      }))
    );
  
    setOpen(true);
    sendAnswer();
    const allTestsCompleted = {
      ...completedTests,
      listening: true,
    };
    setCompletedTests(allTestsCompleted);
  
    navigate('/menu');
    setOpen(false);
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
        totalMarks={`${currentQuestionIndex + 1}/${data?.[0]?.questionSet?.length}`}
      />
      <Paper elevation={0} sx={{ padding: '0 24px 24px' }}>
        <Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <audio controls src={`data:audio/mp3;base64,${audioBase64}`} style={{ height: '30px' }} />
            </Box>
            <ContainerQuestion>
              <ContainerContent numberQuestion={true}>
                <CustomTyphography changeColor={true}>
                  {String(currentQuestionIndex + 1).padStart(2, '0')}.
                </CustomTyphography>
              </ContainerContent>
              <ContainerContent>
                <TypograhpyQuestion variant="body1" align="left">
                  {data?.[0]?.questionSet?.[currentQuestionIndex]?.question}
                </TypograhpyQuestion>
              </ContainerContent>
            </ContainerQuestion>

            <ContainerOptions>
              {data?.[0]?.questionSet?.[currentQuestionIndex]?.options.map((option, index) => (
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
                {currentQuestionIndex === data?.[0]?.questionSet?.length - 1 ? (
                  <Button
                    variant='contained'
                    color='success'
                    endIcon={<CustomSendIcon />}
                    sx={{ fontSize: isLgDown && '0.80rem', height: '25px', width: '150px', color: '#ffffff' }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    sx={{ fontSize: isLgDown && '0.80rem', height: '25px', width: '150px' }}
                    onClick={handleNext}
                    disabled={currentQuestionIndex === data?.[0]?.questionSet?.length - 1}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <BackDropComponent open={open} />
      </Paper>
    </Container>
  );
};
