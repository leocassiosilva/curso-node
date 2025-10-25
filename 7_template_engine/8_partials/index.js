const express = require('express');

const exphbs = require('express-handlebars');


const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials/']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {

    const items = ['Item 1', 'Item 2', 'Item 3'];
    res.render('dashboard', { items: items });
});


app.get('/post', (req, res) => {
    const post = {
        title: 'prendendo node.js',
        category: 'JavaScript',
        body: 'Este é o conteúdo do post',
        comments: 4
    };
    res.render('blogpost', { post: post });
});

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'prendendo node.js',
            category: 'JavaScript',
            body: 'Este é o conteúdo do post',
            comments: 4
        },
        {
        title: 'prendendo node.js',
        category: 'JavaScript',
        body: 'Este é o conteúdo do post',
        comments: 4
        }
    ]
    res.render('blog', { posts: posts });
});

app.get('/', (req, res) => {

    const user = {
        name: 'Alice',
        age: 30,
    }

    const auth = true;
    const approved = false;

    res.render('home', { user: user, auth: auth, approved: approved });
});




app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});