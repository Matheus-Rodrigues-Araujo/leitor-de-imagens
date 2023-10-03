const routes = require('./routes')
const express = require('express')
const app = express()
const PORT = 5500

const T = require('tesseract.js')

const showText = () =>{
    T.recognize('./Placa-Mercosul.jpg', 'eng', {logger: e => console.log(e)})
    .then((text) => {
        console.log(text.data.text)
    })
}

app.use('/', routes)

showText()

app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`))