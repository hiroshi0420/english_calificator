import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TestApi } from '../../Services/TestApi';
import { useTheme } from '@mui/material';

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const UserDetails = () => {
  const { userId, testId } = useParams();
  const [testDetails, setTestDetails] = useState(null); // Cambiado a null por defecto
  const [writingResults, setWritingResults] = useState([]);
  const [readingResults, setReadingResults] = useState([]);
  const [speakingResults, setSpeakingResults] = useState([]); 
  const testApi = new TestApi();
  const theme = useTheme();

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await testApi.getTestById(userId, testId);
        console.log("Test Details:", response); // Para asegurarte de que los datos llegan
        setTestDetails(response.data[0]); // Suponiendo que el primer elemento del array es el objeto que necesitas
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    const fetchWritingResults = async () => {
      try {
        const data = await testApi.getWritingTestById(testId);
        setWritingResults(data);
      } catch (error) {
        console.error('Error fetching writing test results:', error);
      }
    };
    const fetchReadingResults = async () => {
      try {
        const data = await testApi.getReadingTestById(testId);
        setReadingResults(data);
      } catch (error) {
        console.error('Error fetching reading test results:', error);
      }
    };
    const fetchSpeakingResults = async () => {
      try {
        const data = await testApi.getSpeakingTestById(testId);
        setSpeakingResults(data);
      } catch (error) {
        console.error('Error fetching speaking test results:', error);
      }
    };

    fetchTestDetails();
    fetchWritingResults(); // Obtener resultados específicos de Writing
    fetchReadingResults(); // Obtener resultados Reading
    fetchSpeakingResults(); // Obtener resultados Speaking
  }, [userId, testId, testApi]);

  if (!testDetails) {
    return <Typography>Loading test details...</Typography>;
  }

  return (
    <Box>
      {/* Resultados Globales */}
      {testDetails && (
        <Box mb={4}>
          <Typography variant="h4" gutterBottom align="center">Global Results</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Global Result (%)</TableCell>
                  <TableCell align="center">English Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{testDetails.globalResultPercentage.toFixed(2)}%</TableCell>
                  <TableCell align="center">{testDetails.globalResultLevel}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Resultados por Examen */}
      {testDetails && (
        <Box mb={4}>
          <Typography variant="h4" gutterBottom align="center">Global Result by Test</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Test</TableCell>
                  <TableCell align="center">Result (%)</TableCell>
                  <TableCell align="center">Level</TableCell>
                  <TableCell align="center">Justification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {['reading', 'writing', 'listening', 'speaking'].map((exam) => (
                  <TableRow key={exam}>
                    <TableCell align="center">{capitalizeFirstLetter(exam)}</TableCell>
                    <TableCell align="center">{testDetails[`${exam}ResultPercentage`]?.toFixed(2)}%</TableCell>
                    <TableCell align="center">{testDetails[`${exam}ResultLevel`]}</TableCell>
                    <TableCell align="center">{testDetails[`${exam}Justification`]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Resultados Específicos de Writing */}
      {writingResults.length > 0 && (
        <Box mb={4}>
          <Typography variant="h4" gutterBottom align="center">Specific Result by Writing Test</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Test</TableCell>
                  <TableCell align="center">Question</TableCell>
                  <TableCell align="center">User Answer</TableCell>
                  <TableCell align="center">Score (%)</TableCell>
                  <TableCell align="center">English Level</TableCell>
                  <TableCell align="center">Justification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {writingResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell align="center">Writing</TableCell>
                    <TableCell align="center">{result.question}</TableCell>
                    <TableCell align="center">{result.userAnswer}</TableCell>
                    <TableCell align="center">{result.scorePercentage}%</TableCell>
                    <TableCell align="center">{result.englishLevel}</TableCell>
                    <TableCell align="center">{result.justification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Resultados Específicos de Reading */}
      {readingResults.length > 0 && (
        <Box mb={4}>
          <Typography variant="h4" gutterBottom align="center">Specific Result by Reading Test</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Test</TableCell>
                  <TableCell align="center">Question</TableCell>
                  <TableCell align="center">User Answer</TableCell>
                  <TableCell align="center">Score (%)</TableCell>
                  <TableCell align="center">English Level</TableCell>
                  <TableCell align="center">Justification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {readingResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell align="center">Reading</TableCell>
                    <TableCell align="center">{result.question}</TableCell>
                    <TableCell align="center">{result.userAnswer}</TableCell>
                    <TableCell align="center">{result.scorePercentage}%</TableCell>
                    <TableCell align="center">{result.englishLevel}</TableCell>
                    <TableCell align="center">{result.justification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Resultados Específicos de Speaking */}
      {speakingResults.length > 0 && (
        <Box mb={4}>
          <Typography variant="h4" gutterBottom align="center">Specific Result by Speaking Test</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Test</TableCell>
                  <TableCell align="center">Question</TableCell>
                  <TableCell align="center">Score (%)</TableCell>
                  <TableCell align="center">English Level</TableCell>
                  <TableCell align="center">Justification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {speakingResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell align="center">Speaking</TableCell>
                    <TableCell align="center">{result.question}</TableCell>
                    <TableCell align="center">{result.scorePercentage}%</TableCell>
                    <TableCell align="center">{result.englishLevel}</TableCell>
                    <TableCell align="center">{result.justification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

    </Box>
  );
};

export default UserDetails;
