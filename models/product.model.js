const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    description: [{
        type: String,
        required: true
    }],
    productImage: {
        type: String,
        required: true
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product