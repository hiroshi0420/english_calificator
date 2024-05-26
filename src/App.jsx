import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Router from './Router/router';
import './App.css'
import { Layout } from './Pages/Layout/Layout';
import { Login } from './Pages/Login/Login';
import { Menu } from './Pages/Menu/Menu';
import { WritingTest } from './Pages/WritingTest/WritingTest';
import { ReadingTest } from './Pages/ReadingTest.js/ReadingTest';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Menu" element={<Layout><Menu /></Layout>} />
          <Route path="/WritingTest" element={<Layout><WritingTest /></Layout>} />
          <Route path="/ReadingTest" element={<Layout><ReadingTest /></Layout>} />

          {/* Ruta para manejar todas las rutas no definidas */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
