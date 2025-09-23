const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('API e-convenio rodando!'));

app.listen(3000, () => {
  console.log('Backend rodando na porta 3000');
});
