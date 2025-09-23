import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Empresas() {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    status: 'Ativa'
  });
  const [empresas, setEmpresas] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchEmpresas = async () => {
    try {
      const res = await axios.get('http://localhost:3000/empresas');
      setEmpresas(res.data);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error.message);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/empresas/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post('http://localhost:3000/empresas', formData);
      }
      setFormData({ nome: '', cnpj: '', endereco: '', telefone: '', status: 'Ativa' });
      fetchEmpresas();
    } catch (error) {
      alert('Erro ao salvar empresa: ' + error.message);
    }
  };

  const handleEdit = (empresa) => {
    setFormData({
      nome: empresa.Nome,
      cnpj: empresa.CNPJ,
      endereco: empresa.Endereco,
      telefone: empresa.Telefone,
      status: empresa.Status
    });
    setEditId(empresa.Id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirma a exclusão da empresa?')) {
      try {
        await axios.delete(`http://localhost:3000/empresas/${id}`);
        fetchEmpresas();
      } catch (error) {
        alert('Erro ao excluir empresa: ' + error.message);
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3>{editId ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: '400px' }}>
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
        <input type="text" name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} required />
        <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Ativa">Ativa</option>
          <option value="Inativa">Inativa</option>
        </select>
        <button type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <h4 style={{ marginTop: '2rem' }}>Empresas Cadastradas</h4>
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Nome</th><th>CNPJ</th><th>Endereço</th><th>Telefone</th><th>Status</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.Id}>
              <td>{empresa.Nome}</td>
              <td>{empresa.CNPJ}</td>
              <td>{empresa.Endereco}</td>
              <td>{empresa.Telefone}</td>
              <td>{empresa.Status}</td>
              <td>
                <button onClick={() => handleEdit(empresa)}>✏️ Editar</button>{' '}
                <button onClick={() => handleDelete(empresa.Id)}>🗑️ Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Empresas;
