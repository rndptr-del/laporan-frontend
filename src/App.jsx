import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import PengembalianPage from './pages/PengembalianPage'
import TimbangPage from './pages/TimbangPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return(
    <Routes>
      <Route path="/pengembalian" element={<PengembalianPage />} />
      <Route path="/timbang" element={<TimbangPage />} />

    </Routes>
  );
}

export default App
