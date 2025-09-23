import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPrincipal from './components/MenuPrincipal';
import Cadastros from './components/Cadastros/Cadastros';
import Manutencao from './components/Manutencao/Manutencao';
import Transferencia from './components/Transferencia/Transferencia';
import Relatorios from './components/Relatorios/Relatorios';

function App() {
  return (
    <Router>
      <MenuPrincipal />
      <Routes>
        <Route path="/cadastros/*" element={<Cadastros />} />
        <Route path="/manutencao/*" element={<Manutencao />} />
        <Route path="/transferencia/*" element={<Transferencia />} />
        <Route path="/relatorios/*" element={<Relatorios />} />
      </Routes>
    </Router>
  );
}

export default App;
