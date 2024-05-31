import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Router from './Router/router';
import { Layout } from './Pages/Layout/Layout';
import { Login } from './Pages/Login/Login';
import { Menu } from './Pages/Menu/Menu';
import { WritingTest } from './Pages/WritingTest/WritingTest';
import { ReadingTest } from './Pages/ReadingTest.js/ReadingTest';
import { Instructions } from './Pages/Instructions/Instructions';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={Router.appLogin} element={<Login />} />
          <Route path="/" element={<Layout><Instructions/></Layout>} />
          <Route path={Router.appMenu} element={<Layout><Menu /></Layout>} />
          <Route path={Router.appWritinTest} element={<Layout><WritingTest /></Layout>} />
          <Route path={Router.appReadingTest} element={<Layout><ReadingTest /></Layout>} />

          {/* Ruta para manejar todas las rutas no definidas */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
