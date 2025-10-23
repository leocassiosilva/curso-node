const express = require('express');

const port = 5000;

const app = express();
const projectsRoutes = require('./projects')
app.use(express.static('public'));

app.use('/projects', projectsRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

