import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import { Paper, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
// Components
import { PageTitle } from '../../Components/PageTitle/PageTitle';
import { HeaderSection } from '../../Components/Header/HeaderSection';
import { CustomTextField } from '../../Components/TextField/TextField';
// Styles
import { SectionPageTitle, ContainerQuestion, ContainerContent, CustomTyphography, Container, CustomSendIcon } from './Style';
import { TypograhpyQuestion } from '../Style';

// API
import { QuestionApi } from '../../Services/QuestionsApi';
import { TestApi } from '../../Services/TestApi';

import { TestContext } from '../../Context/TestProvider';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';

export const WritingTest = () => {
  const questionApi = new QuestionApi();
  const testApi = new TestApi();
  const { completedTests, setCompletedTests } = useContext(TestContext);
  const navigate = useNavigate();

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    userAnswer: '',
  });
  const [allResponses, setAllResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const progress = ((currentQuestionIndex + 1) / (data?.questions.length || 1)) * 100;
  const idTest = JSON.parse(localStorage.getItem('test'));

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]); 

  const loadQuestions = async () => {
    try {
      let response = await questionApi.getWritingTest(4);
      if (response.status === 200) {
        let resp = response.data;
        setData(resp);
        // Inicializar el estado de respuestas
        setResponses(resp.questions.map(() => ({ userAnswer: '' })));
        // Establecer la primera pregunta en el estado actual
        setCurrentQuestion({ question: resp.questions[0].question, userAnswer: '' });
        // Inicializar el estado de todas las respuestas
        setAllResponses(resp.questions.map((q) => ({
          testId: idTest[0]?.id,
          writingQuestionId: q.id,
          userAnswer: '',
        })));
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const sendAnswer = async () => {
    try {
      let response = await questionApi.sendWritingTest(allResponses);
      if (response.status === 200) {
        let resp = response.data;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
    }
  };


  const handleNext = () => {
    if (currentQuestionIndex < data?.questions.length - 1) {
      // Guardar la respuesta actual en el estado de respuestas
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = { userAnswer: currentQuestion?.userAnswer };
      setResponses(updatedResponses);

      // Actualizar el estado de todas las respuestas
      const updatedAllResponses = [...allResponses];
      updatedAllResponses[currentQuestionIndex].userAnswer = currentQuestion?.userAnswer;
      setAllResponses(updatedAllResponses);

      // Cambiar a la siguiente pregunta
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion({
        question: data.questions[nextIndex].question,
        userAnswer: updatedResponses[nextIndex].userAnswer || '',
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Guardar la respuesta actual en el estado de respuestas
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = { userAnswer: currentQuestion?.userAnswer };
      setResponses(updatedResponses);

      // Actualizar el estado de todas las respuestas
      const updatedAllResponses = [...allResponses];
      updatedAllResponses[currentQuestionIndex].userAnswer = currentQuestion?.userAnswer;
      setAllResponses(updatedAllResponses);

      // Cambiar a la pregunta anterior
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setCurrentQuestion({
        question: data.questions[prevIndex].question,
        userAnswer: updatedResponses[prevIndex].userAnswer || '',
      });
    }
  };


  const handleChange = (value, name) => {
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    setOpen(true);
    // Guardar la respuesta actual en el estado de respuestas
    const updatedAllResponses = [...allResponses];
    updatedAllResponses[currentQuestionIndex].userAnswer = currentQuestion.userAnswer;
    setAllResponses(updatedAllResponses);

    sendAnswer();
    const allTestsCompleted = {
      ...completedTests,
      writing: true,
    };
    setCompletedTests(allTestsCompleted);

    setOpen(false);
    navigate('/menu');
  };

  // Format the time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <SectionPageTitle>
        <PageTitle title='Writing Test' icon={<ArticleIcon />} />
      </SectionPageTitle>
      <HeaderSection
        formatTime={formatTime}
        timeLeft={timeLeft}
        progress={progress}
        totalMarks={`${currentQuestionIndex + 1}/${data?.questions.length}`}
      />
      <Paper elevation={0} sx={{ padding: '0 24px 24px' }}>
        <Box>
          <Box>
            <ContainerQuestion>
              <ContainerContent numberQuestion={true}>
                <CustomTyphography>
                  {String(currentQuestionIndex + 1).padStart(2, '0')}.
                </CustomTyphography>
              </ContainerContent>
              <ContainerContent>
                <TypograhpyQuestion variant="body1" align="left">
                  {data?.questions[currentQuestionIndex].question}
                </TypograhpyQuestion>
              </ContainerContent>
            </ContainerQuestion>

            <CustomTextField
              currentQuestion={currentQuestion}
              handleChange={handleChange}
            />

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
                {
                  currentQuestionIndex === data?.questions.length - 1 ? (

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
                      disabled={currentQuestionIndex === data?.questions.length - 1}
                    >
                      Next
                    </Button>
                  )
                }
              </Box>
            </Box>
          </Box>
        </Box>
        <BackDropComponent open={open} />
      </Paper>
    </Container>
  );
};
