const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"

    }],

    address: {
        type: String,
        required: true
    }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order