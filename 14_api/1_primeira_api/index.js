const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Criando minhas rotas
app.post('/creaeproduct', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json({ message: `O produto ${name} com o preço de R$${price} foi criado com sucesso!` });
});

app.get('/', (req, res) => {
    res.json({ message: 'Olá mundo!' });
});


app.listen(3000)