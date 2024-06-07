import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Paper, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import Divider from '@mui/material/Divider';
// Components
import { PageTitle } from '../../Components/PageTitle/PageTitle';
import { HeaderSection } from '../../Components/Header/HeaderSection';
import { CustomTextField } from '../../Components/TextField/TextField';
// Styles
import { SectionPageTitle, ContainerQuestion, ContainerContent, CustomTyphography, Container, CustomSendIcon, ContainerText } from './Style';

// API
import { QuestionApi } from '../../Services/QuestionsApi';

export const ReadingTest = () => {
  const questionApi = new QuestionApi();
  const navigate = useNavigate();

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    response: '',
  });
  const [allResponses, setAllResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const progress = ((currentQuestionIndex + 1) / (data?.questions.length || 1)) * 100;

  const loadQuestions = async () => {
    try {
      let response = await questionApi.getReadingTest();
      if (response.status === 200) {
        let resp = response.data;
        setData(resp);
        // Inicializar el estado de respuestas
        setResponses(resp.questions.map(() => ({ response: '' })));
        // Establecer la primera pregunta en el estado actual
        setCurrentQuestion({ question: resp.questions[0].question, response: '' });
        // Inicializar el estado de todas las respuestas
        setAllResponses(resp.questions.map((q) => ({ question: q.question, response: '' })));
      } else {
        console.error('Error al cargar preguntas:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  console.log('data', data)

  const sendAnswer = async () => {
    try {
      console.log('allResponses', allResponses)

      let response = await questionApi.sendWritingTest(allResponses);
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
    if (currentQuestionIndex < data?.questions.length - 1) {
      // Guardar la respuesta actual en el estado de respuestas
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = { response: currentQuestion.response };
      setResponses(updatedResponses);

      // Actualizar el estado de todas las respuestas
      const updatedAllResponses = [...allResponses];
      updatedAllResponses[currentQuestionIndex].response = currentQuestion.response;
      setAllResponses(updatedAllResponses);

      // Cambiar a la siguiente pregunta
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion({
        question: data.questions[nextIndex].question,
        response: updatedResponses[nextIndex].response,
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Guardar la respuesta actual en el estado de respuestas
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = { response: currentQuestion.response };
      setResponses(updatedResponses);

      // Actualizar el estado de todas las respuestas
      const updatedAllResponses = [...allResponses];
      updatedAllResponses[currentQuestionIndex].response = currentQuestion.response;
      setAllResponses(updatedAllResponses);

      // Cambiar a la pregunta anterior
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setCurrentQuestion({
        question: data.questions[prevIndex].question,
        response: updatedResponses[prevIndex].response,
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
    // Guardar la respuesta actual en el estado de respuestas
    const updatedAllResponses = [...allResponses];
    updatedAllResponses[currentQuestionIndex].response = currentQuestion.response;
    setAllResponses(updatedAllResponses);

    sendAnswer();
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
        <PageTitle title='Reading Test' icon={<ArticleIcon />} />
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
            <ContainerText>
              <Typography variant='body1'>
                  {data?.text}
              </Typography>
            </ContainerText>
            <Divider primary='Inbox' />
            <ContainerQuestion>
              <ContainerContent numberQuestion={true}>
                <CustomTyphography>
                  {String(currentQuestionIndex + 1).padStart(2, '0')}.
                </CustomTyphography>
              </ContainerContent>
              <ContainerContent>
                <Typography variant="body1" align="left">
                  {data?.questions[currentQuestionIndex].question}
                </Typography>
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
                      color='warning'
                      endIcon={<CustomSendIcon />}
                      sx={{ fontSize: isLgDown && '0.80rem', height: '25px', width: '150px' }}
                      onClick={() => navigate('/')}
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
      </Paper>
    </Container>
  );
};
