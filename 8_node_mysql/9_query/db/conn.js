const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user:'root',
    password: '1234',
    database: 'testdb'
});

module.exports = pool;
