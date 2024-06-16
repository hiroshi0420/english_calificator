import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { theme, globalStyles } from '../src/Global/GlobalStyle';

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Router from './Router/router';
import { Layout } from './Pages/Layout/Layout';
import { Login } from './Pages/Login/Login';
import { Menu } from './Pages/Menu/Menu';
import { WritingTest } from './Pages/WritingTest/WritingTest';
import { ReadingTest } from './Pages/ReadingTest/ReadingTest';
import { ListeningTest } from './Pages/ListeningTest/ListeningTest';
import { SpeakingTest } from './Pages/SpeakingTest/SpeakingTest';
import { ResultsTest } from './Pages/ResultsTest/ResultsTest';

import { TestProvider } from './Context/TestProvider';

const TestProviderWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <TestProvider location={location}>
      {children}
    </TestProvider>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles styles={globalStyles}/>
      <BrowserRouter>
        <TestProviderWrapper>
          <Routes>
            <Route path={'/'} element={<Login />} />
            <Route path={Router.appMenu} element={<Layout><Menu /></Layout>} />
            <Route path={Router.appWritingTest} element={<Layout><WritingTest /></Layout>} />
            <Route path={Router.appReadingTest} element={<Layout><ReadingTest /></Layout>} />
            <Route path={Router.applisteningTest} element={<Layout><ListeningTest/></Layout>} />
            <Route path={Router.appSpeakingTest} element={<Layout><SpeakingTest/></Layout>} />
            <Route path={Router.appResults} element={<Layout><ResultsTest/></Layout>} />
            {/* Ruta para manejar todas las rutas no definidas */}
            <Route path="*" element={<Login />} />
          </Routes>
        </TestProviderWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
