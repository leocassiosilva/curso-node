const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const  conn = require('./db/conn');

// Cria a aplicação Express
const app = express();

// Configura o Handlebars como engine de template
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middlewares para lidar com requisições
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(express.static('public'));

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});