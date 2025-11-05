const Product = require('../models/Product');

module.exports = class ProductsController {
    static async showProducts(req, res) {
        res.render('products/all')
    }
}
