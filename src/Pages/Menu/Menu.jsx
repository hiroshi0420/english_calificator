import React, { useState, useEffect, useContext } from 'react';
import { Typography } from '@mui/material';

import ImgHome from '../../../public/Home.png';

import { ComponentCardMenu } from '../../Components/CardMenu/ComponentCardMenu';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DialogComponent from '../../Components/Dialog/DialogComponent';
import Router from '../../Router/router';
import { TestContext } from '../../Context/TestProvider';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';
import Divider from '@mui/material/Divider';

import { TestApi } from '../../Services/TestApi';


import { Section, Container, ContainerLeft, ContainerRight, ImgSection, TitleHome, SectionCategories, ContainerCards } from './Style';

export const Menu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const testApi = new TestApi();
  const [showInstructions, setShowInstructions] = useState(false);
  const [nextPath, setNextPath] = useState('');
  const [open, setOpen] = useState(false); // Estado para el Backdrop
  const [examDetails, setExamDetails] = useState({
    name: '',
    type: '',
    totalQuestion: 3,
    totalDuration: '10 minutes'
  });
  const { completedTests, enabledTests, setEnabledTest } = useContext(TestContext);
  const user = JSON.parse(localStorage.getItem('profile'))
  console.log('usuario', user);

  useEffect(() => {
    getTestUserId();
  }, [user])

  const getTestUserId = async() => {
    const response = await testApi.getTestById(user.userId);
    if(response.status === 200) {
      await localStorage.setItem('test', JSON.stringify(response));
      setEnabledTest(false);
    }else if(response.status === 404) {
      setEnabledTest(true);
    }
  }

  const handleNavigation = (path, name, type) => {
    setNextPath(path);
    setExamDetails({ name, type, totalQuestion: 3, totalDuration: '10 minutes' });
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    setOpen(true); // Mostrar el Backdrop
    setTimeout(() => {
      setOpen(false); // Ocultar el Backdrop
      navigate(nextPath); // Redirigir al examen seleccionado
    }, 2000); // Simulando una espera de 2 segundos antes de redirigir
  };

  const components = [
    { id: 1, type: 'reading', name: 'Reading', name2: 'Reading Test', router: Router.appReadingTest, disabled: enabledTests},
    { id: 2, type: 'listening', name: 'Listening', name2: 'Listening Test', router: Router.applisteningTest, disabled: enabledTests },
    { id: 3, type: 'speaking', name: 'Speaking', name2: 'Speaking Test', router: Router.appSpeakingTest, disabled: enabledTests },
    { id: 4, type: 'writing', name: 'Writing', name2: 'Writing Test', router: Router.appWritingTest, disabled: enabledTests },
  ];

  return (
    <Section>
      <Container>
        <ContainerLeft>
          <TitleHome variant='h3' align='left' fontWeight='bold' needMargin={true}>
            Unlock Your Potential: <br />
            Fast, Accurate English Proficiency <br />
            Testing.
          </TitleHome>

          <Typography variant='caption' align='left'>
            Start Your Comprehensive Evaluation Today and Elevate Your Career Prospects, discover Your English Proficiency Level and Prepare to Conquer New Global Challenges
          </Typography>

        </ContainerLeft>
        <ContainerRight>
          <ImgSection src={ImgHome} alt='Home image' />
        </ContainerRight>


        <SectionCategories>
          <TitleHome variant='h5' fontWeight='bold' gutterBottom>Categories</TitleHome>
          <ContainerCards>
            <ComponentCardMenu 
              components={components}
              completedTests={completedTests}
              handleNavigation={handleNavigation}
              enabledTests={enabledTests}
            />
          </ContainerCards>
        </SectionCategories>

        <Divider/>
      </Container>


      <DialogComponent
        examDetails={examDetails}
        nextPath={nextPath}
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
        handleCloseInstructions={handleCloseInstructions}
      />

      <BackDropComponent open={open} />
    </Section>
  );
};

export default Menu;
