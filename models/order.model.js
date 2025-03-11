const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    products: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],

    address: {
        type: String,
        required: true
    }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order