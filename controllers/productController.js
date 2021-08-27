const Product = require("../models/productModel");


exports.getProducts = async (req, res) => {
    try {
        var products = await Product.find()
        res.status(200).json({
            message: "success",
            success: true,
            data: products
        })
    } catch (error) {
        res.status(404).json({
            message: "error",
            success: true,
            error: error.message,
        });
    }
}

exports.addProduct = async (req, res) => {
    try {
        var product = await Product.create(req.body)
        res.status(200).json({
            message: "success",
            success: true,
            data: product
        })
    } catch (error) {
        res.status(404).json({
            message: "error",
            success: true,
            error: error.message,
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id); // req.params.id in express, query.id in next
        if (!product) {
            res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            message: "success",
            success: true,
            data: product
        })
    } catch (error) {
        res.status(404).json({
            message: "error",
            success: true,
            error: error.message,
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        product.remove()
        res.status(200).json({
            message: "success",
            success: true,
            data: product
        })
    } catch (error) {
        res.status(404).json({
            message: "error",
            success: true,
            error: error.message,
        });
    }
}