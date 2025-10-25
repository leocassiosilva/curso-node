const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();


const hbs = exphbs.create({
    partialsDir: ['views/partials/']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const produtos = [{
    id: 1,
    nome: 'Notebook',
    preco: 2500.00,
    descricao: 'Um notebook potente para todas as suas necessidades.',
    }, 
    {
    id: 2,
    nome: 'Smartphone',
    preco: 1500.00,
    descricao: 'Um smartphone moderno com todas as funcionalidades.',
    }];


app.get('/', (req, res) => {

    res.render('home', { produtos: produtos });
});
app.get('/produto/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produto = produtos[parseInt(req.params.id) - 1];

    res.render('produto', { produto: produto });
    
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
