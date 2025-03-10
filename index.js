const { initializeDatabase } = require("./db/db.connect")
const Category = require("./models/category.model")
const Product = require("./models/product.model")
const Order = require("./models/order.model.js")
const fs = require("fs")
const cors = require("cors")
const express = require("express")

const jsonObj = fs.readFileSync("products.json", "utf-8")
const productsData = JSON.parse(jsonObj)


const app = express()
app.use(express.json())
corsOptions = {
    origin: "*",
    credentials: true
}

app.use(cors(corsOptions))
initializeDatabase()

const addProducts = async(productsData) => {
    try {
        for (const product of productsData) {
            const newProduct = new Product(product)
            const addedProduct = await newProduct.save()
            console.log(addedProduct)
        }
    } catch (error) {
        console.log("Cannot add products", error)
    }
}

const getProducts = async() => {
    try {
        const products = await Product.find().populate("category")
        return products
    } catch (error) {
        console.log("Cannot get Products", error)
    }
}


app.post("/products/orderedproducts", async(req, res) => {

    try {

        const data = req.body
        const product = new Order(data)
        const savedProduct = await product.save()
        if (savedProduct) {
            res.status(201).json({ message: "Product Saved Successfully", product: savedProduct })
        }


    } catch (error) {
        res.status(500).json({ message: "Product Cannot be Saved" })

    }


})

const getOrderedProducts = async() => {

    try {

        const orderedProducts = await Order.find().populate("product")
        const orderedProductsArrFinal = []
        for (let order of orderedProducts) {
            const orderedProductsTitles = []
            for (let product of order.product) {

                orderedProductsTitles.push(product.title)

            }

            orderedProductsArrFinal.push({ titles: orderedProductsTitles, address: order.address })


        }
        return orderedProductsArrFinal


    } catch (error) {
        console.log("Cannot find ordered Products", error)
    }


}

app.get("/orderedProducts", async(req, res) => {
    try {
        const orderedProducts = await getOrderedProducts()
        if (orderedProducts.length !== 0) {
            res.json(orderedProducts)
        } else {
            res.status(404).json({ error: "Products Not exist" })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot get Ordered Products" })
    }
})


app.get("/products", async(req, res) => {
    try {

        const products = await getProducts()
        if (products.length !== 0) {
            res.json(products)
        } else {
            res.status(404).json({ error: "Products Not Found" })
        }

    } catch (error) {
        res.status(500).json({ error: "Cannot get Products" })
    }
})

const getProductsByCategory = async(categoryId) => {
    try {
        const products = await Product.find({ category: categoryId }).populate("category")
        return products
    } catch (error) {
        console.log("Cannot Get Products from Category", error)
    }
}

app.get("/products/category/:categoryId", async(req, res) => {
    try {
        const products = await getProductsByCategory(req.params.categoryId)
        if (products.length !== 0) {
            res.json(products)
        } else {
            res.status(404).json({ error: "Products Not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot get Products By Category" })
    }
})


const getProductById = async(productId) => {

    try {
        const product = await Product.findById(productId)
        return product
    } catch (error) {
        console.log(error)
    }


}

app.get("/products/productdetails/:productId", async(req, res) => {
    try {
        const product = await getProductById(req.params.productId)
        if (!product) {
            res.status(404).json({ error: "Cannot Find Product" })
        } else {
            res.json(product)
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot Get The Products" })
    }
})

const addCategories = async(categories) => {

    try {

        for (const category of categories) {

            const newCategory = new Category(category)
            const addedCategory = await newCategory.save()
            console.log(addedCategory)

        }

    } catch (error) {
        console.log("cannot add categories", error)
    }

}

const getCategories = async() => {
    try {
        const categories = await Category.find()
        return categories
    } catch (error) {
        console.log("Cannot get categories", error)
    }
}

const getCategoryById = async(categoryId) => {
    try {
        const category = await Category.findById(categoryId)
        return category
    } catch (error) {
        console.log("Cannot get category", error)
    }
}

app.get("/categories", async(req, res) => {

    try {

        const categories = await getCategories()
        if (categories.length !== 0) {
            res.json(categories)
        } else {
            res.status(404).json({ error: "Categories Data Not Found" })
        }

    } catch (error) {
        res.status(500).json({ error: "Cannot Get Categories Data" })
    }

})

// getOrderedProducts()

const PORT = 3000

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT)
})