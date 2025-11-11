const express = require('express');
const cors = require('cors');

const app = express();
const conn = require("./db/conn").run;
///configuração JSON response
app.use(express.json());


//solve 'CORS'
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//PUblic folder images
app.use(express.static('public'));

//Routes

app.listen(5000)


