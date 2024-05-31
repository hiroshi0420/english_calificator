import { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { useTheme } from '@mui/material/styles';
import { SectionPageTitle, ContainerQuestion, ContainerContent, CustomTyphography } from './Style';
import { PageTitle } from '../../Components/PageTitle/PageTitle';
import ProgressStepper from '../../Components/Progress/Progress';
import { QuestionMark } from '../../Components/QuestionMark/QuestionMark';
import { HeaderSection } from '../../Components/Header/HeaderSection';

// API
import { QuestionApi } from '../../Services/QuestionsApi';

export const WritingTest = () => {
  const [data, setData] = useState(null);
  const [respQuestion, setRespQuestion] = useState(null);
  const [currentQuestion, setCurrentCuestion] = useState({
    question: '',
    response: '',
  });

  const questionApi = new QuestionApi();

  const loadQuestions = async () => {
    try {
      let response = await questionApi.getWritingTest();
      if (response.status === 200) {
        let resp = response.data;
        setData(resp);
        setCurrentCuestion({
          question: resp?.question,
          response: ''
        });
      } else {
        console.error('Error al cargar preguntas:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  const sendAnswer = async () => {
    if (!currentQuestion.question || !currentQuestion.response) {
      console.error('La pregunta y la respuesta no pueden estar vacías');
      return;
    }

    try {
      console.log('Enviando respuesta:', currentQuestion);
      let response = await questionApi.sendWritingTest(currentQuestion);
      if (response.status === 200) {
        let resp = response.data;
        setRespQuestion(resp);
      } else {
        console.error('Error al enviar respuesta:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
    }
  }

  const handleChange = (value, name) => {
    setCurrentCuestion({ ...currentQuestion, [name]: value });
  }

  console.log('data', data);
  console.log('respQuestion', respQuestion);

  useEffect(() => {
    loadQuestions();
  }, [])

  const handleSubmit = () => {
    sendAnswer();
  }

  return (
    <Container maxWidth='' sx={{ marginTop: 4, marginLeft: 4, marginRight: 4 }}>
      <SectionPageTitle>
        <PageTitle title='Writing Test' icon={<ArticleIcon />} />
      </SectionPageTitle>

      <HeaderSection />

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <Box sx={{ width: '40%' }}>
            <QuestionMark />
          </Box>

          <Box sx={{ width: '60%' }}>
            <ContainerQuestion>
              <ContainerContent numberQuestion={true}>
                <CustomTyphography>
                  01.
                </CustomTyphography>
              </ContainerContent>
              <ContainerContent>
                <Typography variant="body1" align="center">
                  {data?.question}
                </Typography>
              </ContainerContent>
            </ContainerQuestion>

            <Box pl={2} pr={2} sx={{ marginBottom: 2 }}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                value={currentQuestion.response}
                onChange={(e) => handleChange(e.target.value, 'response')}
                placeholder="Write your response here..."
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' onClick={handleSubmit}>
                Enviar
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
