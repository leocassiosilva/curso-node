const express = require('express');
const cors = require('cors');

const app = express();
const conn = require("./db/conn").run;
///configuração JSON response
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//solve 'CORS'
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//PUblic folder images
app.use(express.static('public'));

//Routes
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);


app.listen(5000)


