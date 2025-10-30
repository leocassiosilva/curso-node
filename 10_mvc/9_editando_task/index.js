const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const  conn = require('./db/conn');

const Task = require('./models/Task');

const taskRoutes = require('./routes/taskRoutes');

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
app.use('/tasks', taskRoutes);

// Inicia o servidor
conn
    .sync()
    //.sync({force:true}) // Sincroniza o modelo com o banco de dados, criando a tabela se ela não existir
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => console.log(err));
