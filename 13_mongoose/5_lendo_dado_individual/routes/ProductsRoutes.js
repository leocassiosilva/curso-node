const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProductController');

// Route to create a new product
router.get('/create', productsController.createProduct);

// Route to handle product creation form submission
router.post("/create", productsController.createProductPost);

// //Remove product
// router.post("/remove/:id", productsController.removeProductPost);

// // Route to product
// router.post('/edit', productsController.editProductByIdSave);

// Route to product
router.get('/edit/:id', productsController.editProductById);

// Route to product
router.get('/:id', productsController.getProductById);

// Route to show products
router.get('/', productsController.showProducts);

module.exports = router;