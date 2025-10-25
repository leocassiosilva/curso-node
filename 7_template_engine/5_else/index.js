const express = require('express');

const exphbs = require('express-handlebars');


const app = express();

app.engine('handlebars', exphbs.engine())


app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {

    const items = ['Item 1', 'Item 2', 'Item 3'];
    res.render('dashboard', { items: items });
});

app.get('/', (req, res) => {

    const user = {
        name: 'Alice',
        age: 30,
    }

    const auth = false;
    const approved = false;

    res.render('home', { user: user, auth: auth, approved: approved });
});




app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});