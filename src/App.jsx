import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import PengembalianPage from './pages/PengembalianPage'
import TimbangPage from './pages/TimbangPage'
import InputDataValidasiPage from './pages/InputDataValidasiPage'
import ValidasiPengembalianPage from './pages/ValidasiPengembalianPage'
import { Routes, Route } from 'react-router-dom'
import { ImageOff } from 'lucide-react'

function App() {
  return(
    <Routes>
      <Route path="/pengembalian" element={<PengembalianPage />} />
      <Route path="/timbang" element={<TimbangPage />} />
      <Route path="/inputvalidasi" element={<InputDataValidasiPage />} />
      <Route path="/validasipengembalian" element={<ValidasiPengembalianPage />} />
    </Routes>
  );
}

export default App
