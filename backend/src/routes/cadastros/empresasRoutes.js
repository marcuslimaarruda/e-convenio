const express = require('express');
const router = express.Router();
const { cadastrarEmpresa } = require('../../controllers/cadastros/empresasController');

router.post('/', cadastrarEmpresa);

module.exports = router;
