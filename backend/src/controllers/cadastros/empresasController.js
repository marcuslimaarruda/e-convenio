const sql = require('mssql');

const config = {
  user: 'sa',
  password: '@Uff2011a',
  server: '192.168.0.151',
  database: 'convenioMP',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function listarEmpresas(req, res) {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Empresas');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Erro ao listar empresas: ' + err.message);
  }
}

async function cadastrarEmpresa(req, res) {
  const { nome, cnpj, endereco, telefone, status } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('nome', sql.VarChar, nome);
    request.input('cnpj', sql.VarChar, cnpj);
    request.input('endereco', sql.VarChar, endereco);
    request.input('telefone', sql.VarChar, telefone);
    request.input('status', sql.VarChar, status);

    await request.query(`
      INSERT INTO Empresas (Nome, CNPJ, Endereco, Telefone, Status)
      VALUES (@nome, @cnpj, @endereco, @telefone, @status)
    `);

    res.status(201).send('Empresa cadastrada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar empresa: ' + err.message);
  }
}

async function excluirEmpresa(req, res) {
  const { id } = req.params;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('id', sql.Int, id);
    await request.query('DELETE FROM Empresas WHERE Id = @id');
    res.send('Empresa excluída com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao excluir empresa: ' + err.message);
  }
}

async function editarEmpresa(req, res) {
  const { id } = req.params;
  const { nome, cnpj, endereco, telefone, status } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('id', sql.Int, id);
    request.input('nome', sql.VarChar, nome);
    request.input('cnpj', sql.VarChar, cnpj);
    request.input('endereco', sql.VarChar, endereco);
    request.input('telefone', sql.VarChar, telefone);
    request.input('status', sql.VarChar, status);

    await request.query(`
      UPDATE Empresas
      SET Nome = @nome, CNPJ = @cnpj, Endereco = @endereco, Telefone = @telefone, Status = @status
      WHERE Id = @id
    `);

    res.send('Empresa atualizada com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao editar empresa: ' + err.message);
  }
}

module.exports = {
  listarEmpresas,
  cadastrarEmpresa,
  excluirEmpresa,
  editarEmpresa
};
