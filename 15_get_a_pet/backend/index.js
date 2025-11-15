const express = require('express');
const cors = require('cors');

const app = express();
const conn = require("./db/conn").run;

// Swagger
const swaggerDocs = require("./swagger");

// Configuração JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public folder images
app.use(express.static('public'));

// Routes
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);

// Swagger documentation route
swaggerDocs(app);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
  console.log("Documentação Swagger em: http://localhost:5000/api-docs");
});
