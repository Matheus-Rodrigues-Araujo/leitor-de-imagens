const express = require('express')
const router = express.Router()


router.get('/', (req, res, next)=>{
    res.send('<h1 style="color:red;" >Hi</h1>')
})

router.get('/cadastroPlaca', (req, res)=> {
    res.send('Cadastro de placa')
})

router.get('/relatorio/cidade/:cidade', (req, res)=> {
    res.send('Relatório da x cidade')
})

router.get('/consulta/:placa', (req, res)=> {
    res.send('Consulta de x placa')
})


module.exports = router