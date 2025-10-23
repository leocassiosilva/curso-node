const express = require('express');
const router = express.Router();

const path = require('path');

const basePath = path.join(__dirname, '../templates');

router.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'projects.html'));
});

router.get('/:id', (req, res) => {
    res.sendFile(path.join(basePath, 'project.html'));
});

module.exports = router;