const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const  pool = require('./db/conn');


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


app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
    const data = ['title', 'pageqty', title, pageqty];

    pool.query(sql, data, (err, results) => {
        if (err) {
            console.error('Erro ao inserir livro:', err);
            res.status(500).send('Erro ao inserir livro');
            return;
        }
        res.redirect('/books');
    });
});


app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar livros:', err);
            res.status(500).send('Erro ao buscar livros');
            return;
        }
        res.render('books', { books: results });
    });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql, data, (err, data) => {
        if (err) {
            console.error('Erro ao buscar livro:', err);
            res.status(500).send('Erro ao buscar livro');
            return;
        }
        res.render('book', { book: data[0] });
    });
});

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql, data, (err, data) => {
        if (err) {
            console.error('Erro ao buscar livro:', err);
            res.status(500).send('Erro ao buscar livro');
            return;
        }
        res.render('editbook', { book: data[0] });
    });

});

app.post('/books/updatebook', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;
    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
    const data = ['title', title, 'pageqty', pageqty, 'id', id];

    pool.query(sql, data, (err, results) => {
        if (err) {
            console.error('Erro ao atualizar livro:', err);
            return;
        }
        res.redirect(`/books`);
    });
});

app.post('/books/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM books WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql, data, (err, results) => {
        if (err) {
            console.error('Erro ao deletar livro:', err);
            return;
        }
        res.redirect(`/books`);
    });
});

app.listen(3000);
