// index.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 27017;

// Configuração do MongoDB
mongoose.connect('mongodb://localhost/nomeDoSeuBancoDeDados', { useNewUrlParser: true, useUnifiedTopology: true });

const placaSchema = new mongoose.Schema({
    numero: String,
    cidade: String,
    dataHora: { type: Date, default: Date.now }
  });
  
// Verificar se a coleção 'Placa' existe, se não, criar
mongoose.connection.on('open', function() {
    mongoose.connection.db.listCollections({name: 'Placa'})
      .next(function(err, collinfo) {
        if (!collinfo) {
          mongoose.connection.db.createCollection('Placa');
        }
      });
  });
  
  const Placa = mongoose.model('Placa', placaSchema);

const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/cadastroPlaca', upload.single('imagem'), async (req, res) => {
  try {
    const cidade = req.body.cidade;
    const imagemPath = req.file.path;

    const { data: { text } } = await Tesseract.recognize(
      imagemPath,
      'por'
    );

    const numeroDaPlaca = text.trim();

    const placa = new Placa({
      numero: numeroDaPlaca,
      cidade: cidade
    });

    await placa.save();

    res.send('Placa cadastrada com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar placa');
  }
});

app.get('/relatorio/cidade/:cidade', async (req, res) => {
    try {
      const cidade = req.params.cidade;
  
      const placas = await Placa.find({ cidade: cidade });
  
      const doc = new PDFDocument();
      doc.pipe(res);
  
      doc.fontSize(16).text(`Relatório de Placas - Cidade: ${cidade}`, { align: 'center' });
      doc.moveDown();
  
      placas.forEach(placa => {
        doc.fontSize(12).text(`Número: ${placa.numero}, Data e Hora: ${placa.dataHora}`, { indent: 20 });
        doc.moveDown();
      });
  
      doc.end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao gerar relatório');
    }
});

app.get('/consulta/:placa', async (req, res) => {
  try {
    const placa = req.params.placa;

    const existe = await Placa.exists({ numero: placa });

    res.json({ existe });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao consultar placa');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
