import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TablePagination, Typography, CircularProgress, Paper, Box, useTheme, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// Styles
import { CustomSubtitle, CustomBox, Section, ContainerTitle, ContainerBack, Container, ContainerIconMap, ContainerContent, SectionPageTitle } from './Style';
import { CustomButtonsActions } from '../Style';

// Icons
import DrawIcon from '@mui/icons-material/Draw'; // Writing
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // Reading
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode'; // Speaking
import HeadphonesIcon from '@mui/icons-material/Headphones'; // Listening
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { TestApi } from '../../Services/TestApi';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from '@mui/material/Link';

import { QuestionApi } from '../../Services/QuestionsApi';

import { TestContext } from '../../Context/TestProvider';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';
import { PageTitle } from '../../Components/PageTitle/PageTitle';

const iconMapping = {
  writing: DrawIcon,
  reading: AutoStoriesIcon,
  speaking: InterpreterModeIcon,
  listening: HeadphonesIcon,
};

export const ResultsTest = () => {
  const theme = useTheme();
  const testApi = new TestApi();
  const questionApi = new QuestionApi();
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState([]);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    getTestByCompanyCompleted(user.companyId);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTests = testCompleted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  const handleReset = () => {
    setOpen(true);
    setTimeout(() => {
      navigate('/menu');
      setOpen(false);
    }, 1000);
  };

  const getTestByCompanyCompleted = async (id) => {
    const response = await testApi.getTestByCompanyCompleted(id);
    console.log('response', response);
    if (response.status === 200) {
      setTestCompleted(response.data);
    }
  }


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };


  return (
    <Container>
      {/* <Grid>
        <Section>
          <ContainerTitle>
            <Typography variant="h4" gutterBottom fontWeight={'bold'} fontSize={'1.5rem'}>
              Test Results
            </Typography>
            <Typography variant="h6" fontSize={'0.80rem'}>
              <span style={{ fontWeight: 'bold' }}>Total Evaluated Sections:</span>
            </Typography>
          </ContainerTitle>
          <Box></Box>
        </Section>
      </Grid> */}
      <SectionPageTitle>
        <PageTitle title='Historical Results' icon={<ManageSearchIcon/>}/>
      </SectionPageTitle>

      <TableContainer sx={{ mt: 4 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold'}}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Company Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.user.firstName}</TableCell>
                <TableCell>{test.user.lastName}</TableCell>
                <TableCell>{test.user.email}</TableCell>
                <TableCell>{test.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={testCompleted.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <BackDropComponent open={open} />
    </Container>
  );
};
