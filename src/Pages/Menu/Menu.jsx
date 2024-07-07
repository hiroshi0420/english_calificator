import React, { useState, useContext } from 'react';
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


import { Section, Container, ContainerLeft, ContainerRight, ImgSection, TitleHome, SectionCategories, ContainerCards } from './Style';

export const Menu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const [nextPath, setNextPath] = useState('');
  const [open, setOpen] = useState(false); // Estado para el Backdrop
  const [examDetails, setExamDetails] = useState({
    name: '',
    type: '',
    totalQuestion: 3,
    totalDuration: '10 minutes'
  });
  const { completedTests } = useContext(TestContext);

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
    { id: 1, type: 'reading', name: 'Reading', name2: 'Reading Test', router: Router.appReadingTest },
    { id: 2, type: 'listening', name: 'Listening', name2: 'Listening Test', router: Router.applisteningTest },
    { id: 3, type: 'speaking', name: 'Speaking', name2: 'Speaking Test', router: Router.appSpeakingTest },
    { id: 4, type: 'writing', name: 'Writing', name2: 'Writing Test', router: Router.appWritingTest },
  ];

  return (
    <Section>
      <Container>
        <ContainerLeft>
          <TitleHome variant='h3' align='left' fontWeight='bold' needMargin={true}>
            Assess Your English Skills Today: <br />
            Precise, Quick, and Comprehensive <br />
            Evaluations.
          </TitleHome>

          <Typography variant='caption' align='left'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
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
