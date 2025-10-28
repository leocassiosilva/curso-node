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

app.get('/users/create', (req, res) => {
    res.render('adduser');
});

app.post('/users/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }
    await User.create({ name, occupation, newsletter })
    res.redirect('/');
    
});

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;
    await User.destroy({ where: { id: id } });
    res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ raw: true, where: { id: id } });
    console.log(user);
    res.render('userview', { user });
});

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ raw: true, where: { id: id } });
    console.log(user);
    res.render('useredit', { user });
});

app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true });
    console.log(users);
    res.render('home',{users:users});
});

conn.sync().then(() => {
    console.log('Banco de dados sincronizado!');
    app.listen(3000);
}).catch((err) => {
    console.log('Erro ao sincronizar o banco de dados:', err);
});
