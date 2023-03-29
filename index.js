require('dotenv').config()
const express = require('express')
const cors = require('cors');
const { mongoose } = require('mongoose');
const app = express()

app.use(cors());

//Leitura de JSON
app.use (
    express.urlencoded({
        extended: true
    })
)

app.use (express.json())

//Rotas da API
const gameRoutes = require('./Routes/gameRoutes')
app.use('/games', gameRoutes)


//Rota inicial / endPoint

app.get('/', (req, res) => {
    res.json({message: 'Bem vindo!'})
})

//Porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.uvpecah.mongodb.net/?retryWrites=true&w=majority`
)
.then (() => {
    console.log("Conectado ao MongoDB!")
    app.listen(3000)

})
.catch((error) => console.log(`Erro: ${error}`))
