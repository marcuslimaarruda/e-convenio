import React from 'react';
import { Link } from 'react-router-dom';

function MenuPrincipal() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <h2>e-convenio</h2>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
        <li><Link to="/cadastros">Cadastros</Link></li>
        <li><Link to="/manutencao">Manutenção</Link></li>
        <li><Link to="/transferencia">Transferência</Link></li>
        <li><Link to="/relatorios">Relatórios</Link></li>
      </ul>
    </nav>
  );
}

export default MenuPrincipal;
