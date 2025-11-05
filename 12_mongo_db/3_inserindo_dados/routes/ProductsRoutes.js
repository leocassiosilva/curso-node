const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProductController');

// Route to create a new product
router.get('/create', productsController.createProduct);

// Route to handle product creation form submission
router.post("/create", productsController.createProductPost);

// Route to show products
router.get('/', productsController.showProducts);

module.exports = router;