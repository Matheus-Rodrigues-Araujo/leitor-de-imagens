const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfkit = require('pdfkit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ mensagem: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Token inválido.' });
    }

    req.usuarioId = decoded.userId;
    next();
  });
};

const placasDB = [];

app.post('/cadastroPlaca', verificarToken, upload.single('imagem'), async (req, res) => {
  try {

    const placa = { numero: numeroPlaca, cidade: req.body.cidade, dataHora: new Date() };
    placasDB.push(placa);

    res.status(201).json({ mensagem: 'Placa cadastrada com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar placa:', error.message);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

app.get('/relatorio/cidade/:cidade', verificarToken, async (req, res) => {
  try {
    const cidade = req.params.cidade;

    const placasCidade = placasDB.filter(placa => placa.cidade === cidade);

    const relatorio = `Relatório para a cidade ${cidade}:\n${JSON.stringify(placasCidade, null, 2)}`;

    res.setHeader('Content-Type', 'application/pdf');
    res.send(relatorio);
  } catch (error) {
    console.error('Erro ao gerar relatório:', error.message);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

app.get('/consulta/:placa', verificarToken, async (req, res) => {
  try {
    const numeroPlaca = req.params.placa;

    const placa = placasDB.find(p => p.numero === numeroPlaca);

    if (placa) {
      res.json({ existe: true, dados: placa });
    } else {
      res.json({ existe: false });
    }
  } catch (error) {
    console.error('Erro ao consultar placa:', error.message);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const io = new Server(server);

app.post('/alerta', verificarToken, (req, res) => {
  const mensagem = 'Inconsistência de dados ou equipamentos foram detectados no sistema';
  io.emit('alerta', mensagem);
  res.json({ mensagem: 'Alerta emitido com sucesso.' });
});
