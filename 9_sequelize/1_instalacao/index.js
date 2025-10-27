const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const  conn = require('./db/conn');


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



app.listen(3000);
