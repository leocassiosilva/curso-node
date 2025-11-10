const Product = require('../models/Product');

module.exports = class ProductsController {
    static async showProducts(req, res) {
        const products = await Product.find().lean();
        console.log(products);
        res.render('products/all', { products });
    }

    static async getProductById(req, res) {
        const id = req.params.id;
        const product = await Product.findById(id).lean();
        res.render('products/product', { product });
    }

    static async editProductById(req, res) {
        const id = req.params.id;
        const product = await Product.findById(id).lean();
        res.render('products/edit', { product });
    }

    static async editProductByIdSave(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const image = req.body.image;

        const product = { name, price, description, image };

        await Product.updateOne({ _id: id }, product);
        res.redirect('/products');
    }


        
    // static async removeProductPost(req, res) {
    //     const id = req.body.id;
    //     await Product.removeById(id);
    //     res.redirect('/products');
    // }

    static async createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const image = req.body.image

        const product = new Product({ name, price, description, image })

        await product.save()

        res.redirect('/products');
    }
}
