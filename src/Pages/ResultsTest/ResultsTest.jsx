import { useState, useEffect } from 'react';
import { Button, Card, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; // Asegúrate de importar useParams
import { Grid, TablePagination, Typography, Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import { CustomSubtitle, CustomBox, SectionPageTitle } from './Style';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { TestApi } from '../../Services/TestApi';
import { BackDropComponent } from '../../Components/BackDrop/BackDropComponet';
import { PageTitle } from '../../Components/PageTitle/PageTitle';

export const ResultsTest = () => {
  const theme = useTheme();
  const testApi = new TestApi();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState([]);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [hasFetched, setHasFetched] = useState(false); // Estado para saber si ya se realizó la llamada

  useEffect(() => {
    if (user && !hasFetched) {
      getTestByCompanyCompleted(user.companyId);
      setHasFetched(true); // Marcamos como que ya se realizó la llamada
    }
  }, [user, hasFetched]);

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
  };

  const { userId, testId } = useParams(); // Capturar parámetros de usuario

  return (
    <Container>
      <SectionPageTitle>
        <PageTitle title="Historical Results" icon={<ManageSearchIcon />} />
      </SectionPageTitle>

      <Paper sx={{ p: 2, mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="subtitle1" fontWeight="bold">First Name</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" fontWeight="bold">Last Name</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" fontWeight="bold">Company Name</Typography>
          </Grid>
          <Grid item xs={2} align="center">
            <Typography variant="subtitle1" fontWeight="bold">Actions</Typography>
          </Grid>
        </Grid>
        {paginatedTests.map((test, index) => (
          <Box key={index} my={2} sx={{ borderBottom: `1px solid ${theme.palette.primary.main}`, pb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography>{test.user.firstName}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{test.user.lastName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{test.user.email}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{test.company.name}</Typography>
              </Grid>
              <Grid item xs={2} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/user-details/${test.user.id}/${test.id}`)} // Pasar tanto userId como testId
                >
                  View Details
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Paper>

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
