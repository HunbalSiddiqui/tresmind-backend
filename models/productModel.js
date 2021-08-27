const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 20
        },
        description: String,
        avgRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0
        },
    }
    ,
    { timestamps: true }
)

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
