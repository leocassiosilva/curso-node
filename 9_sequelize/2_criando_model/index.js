const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const  conn = require('./db/conn');

const User = require('./models/User');



const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());


app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

conn.sync().then(() => {
    console.log('Banco de dados sincronizado!');
    app.listen(3000);
}).catch((err) => {
    console.log('Erro ao sincronizar o banco de dados:', err);
});
