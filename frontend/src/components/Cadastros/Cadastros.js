import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Empresas from './Empresas/Empresas';
import Regras from './Regras/Regras';
import Funcionarios from './Funcionarios/Funcionarios';

function Cadastros() {
  return (
    <div>
      <h3>Cadastros</h3>
      <ul>
        <li><Link to="empresas">Empresas Conveniadas</Link></li>
        <li><Link to="regras">Regras de Convênio</Link></li>
        <li><Link to="funcionarios">Funcionários</Link></li>
      </ul>

      <Routes>
        <Route path="empresas" element={<Empresas />} />
        <Route path="regras" element={<Regras />} />
        <Route path="funcionarios" element={<Funcionarios />} />
      </Routes>
    </div>
  );
}

export default Cadastros;
