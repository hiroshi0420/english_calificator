import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Paper, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// Components
import { PageTitle } from '../../Components/PageTitle/PageTitle';
import { HeaderSection } from '../../Components/Header/HeaderSection';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
// Styles
import { SectionPageTitle, ContainerQuestion, ContainerContent, CustomTyphography, Container, CustomSendIcon } from './Style';
import { TypograhpyQuestion } from '../Style';
// API
import { QuestionApi } from '../../Services/QuestionsApi';
import { RecordingComponent } from '../../Components/Recording/RecordingComponent';

import { TestContext } from '../../Context/TestProvider';

import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';

export const SpeakingTest = () => {
  const navigate = useNavigate();
  const { completedTests, setCompletedTests, setRespTest } = useContext(TestContext);
  const questionApi = new QuestionApi();

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    audioBase64: '',
  });
  const [allResponses, setAllResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const progress = ((currentQuestionIndex + 1) / (data?.questions.length || 1)) * 100;
  const idTest = JSON.parse(localStorage.getItem('test'));

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);


  const loadQuestions = async () => {
    try {
      let response = await questionApi.getSpeakingTest();
      if (response.status === 200) {
        let resp = response.data;
        setData(resp);
        // Inicializar el estado de respuestas
        setResponses(resp.questions.map(() => ({ audioBase64: '' })));
        // Establecer la primera pregunta en el estado actual
        setCurrentQuestion({ question: resp.questions[0].question, audioBase64: '' });
        // Inicializar el estado de todas las respuestas
        setAllResponses(resp.questions.map((q) => ({
          audioBase64: '',
          testId: idTest[0]?.id,
          speakingQuestionId: q.id,
        })));
      } else {
        console.error('Error al cargar preguntas:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const sendAnswer = async () => {
    try {
      let response = await questionApi.sendSpeakingTest(allResponses);
      if (response.status === 200) {
        let resp = response.data;

        console.log('Speaking:', resp);
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
      updatedResponses[currentQuestionIndex] = { audioBase64: currentQuestion.audioBase64 };
      setResponses(updatedResponses);

      // Actualizar el estado de todas las respuestas
      const updatedAllResponses = [...allResponses];
      updatedAllResponses[currentQuestionIndex].audioBase64 = currentQuestion.audioBase64;
      setAllResponses(updatedAllResponses);

      // Cambiar a la siguiente pregunta
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion({
        question: data.questions[nextIndex].question,
        audioBase64: updatedResponses[nextIndex].audioBase64,
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Guardar la respuesta actual en el estado de respuestas
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = { audioBase64: currentQuestion.audioBase64 };
      setResponses(updatedResponses);

      // Actualizar el estado de todas las respuestas
      const updatedAllResponses = [...allResponses];
      updatedAllResponses[currentQuestionIndex].audioBase64 = currentQuestion.audioBase64;
      setAllResponses(updatedAllResponses);

      // Cambiar a la pregunta anterior
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setCurrentQuestion({
        question: data.questions[prevIndex].question,
        audioBase64: updatedResponses[prevIndex].audioBase64,
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
    updatedAllResponses[currentQuestionIndex].audioBase64 = currentQuestion.audioBase64;
    setAllResponses(updatedAllResponses);
    sendAnswer();
    const allTestsCompleted = {
      ...completedTests,
      speaking: true,
    };
    setCompletedTests(allTestsCompleted);

    navigate('/menu');
    setOpen(false);
  };

  // Format the time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };



  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    getMedia();
  }, []);

  const handleStartRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setIsRecording(false);

        // Convert Blob to Base64
        const base64Audio = await blobToBase64(audioBlob);
        const cleanBase64Audio = base64Audio.replace(/^data:audio\/wav;base64,/, '');
        setCurrentQuestion({ ...currentQuestion, audioBase64: cleanBase64Audio });
      };


      setTimeout(() => {
        mediaRecorder.stop();
      }, 60000); // Stop recording after 1 minute
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <Container>
      <SectionPageTitle>
        <PageTitle title='Speaking Test' icon={<InterpreterModeIcon />} />
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

            <RecordingComponent
                handleStartRecording={handleStartRecording}
                handleStopRecording={handleStopRecording}
                isRecording={isRecording}
                audioURL={audioURL}
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
        <BackDropComponent open={open}/>
      </Paper>
    </Container>
  );
};
