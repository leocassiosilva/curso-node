const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Criando minhas rotas
app.get('/', (req, res) => {
    res.json({ message: 'Olá mundo!' });
});

app.listen(3000)