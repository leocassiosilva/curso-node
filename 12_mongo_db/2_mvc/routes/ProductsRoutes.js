const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProductController');

// Route to show products
router.get('/', productsController.showProducts);

module.exports = router;