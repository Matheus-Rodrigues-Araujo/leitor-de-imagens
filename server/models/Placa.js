const mongoose = require('mongoose')
const { Schema } = mongoose

const placaSchema = new mongoose.Schema({
    numero: String,
    cidade: String,
    dataHora: { type: Date, default: Date.now }
});