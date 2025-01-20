const { initializeDatabase } = require("./db/db.connect")
const Category = require("./models/category.model")
const cors = require("cors")
const express = require("express")



const app = express()
app.use(express.json())
corsOptions = {
    origin: "*",
    credentials: true
}

app.use(cors(corsOptions))
initializeDatabase()

const categories = [
    { name: "Smartphones", image: "https://lh5.googleusercontent.com/proxy/g0iMN7EBqsBUcN4vxJx9qcBPLVcwwIU541JaxrVUUsirTkol6OqNUJAYpWL-LnOLpY_7RuFLo5W_FHiIPDBps_iJKANH3IDUlVzN6fInXxKACldouh_afNZuQ3b1FS09CrsKWSUCIUwtZFqqic7HzUTa6Kf4-5_a3Mb_8WL7AESKZsBvZVe0yfw_-cOZzUAivLYAmDU" },
    { name: "Laptops", image: "https://www.atulhost.com/wp-content/uploads/2024/07/best-laptop-brands.jpg" },
    { name: "Smartwatches", image: "https://www.smartwatchforless.com/wp-content/uploads/2023/07/always-on-display-blog.jpeg" },
    { name: "Tablets", image: "https://nypost.com/wp-content/uploads/sites/2/2022/09/tabletfeat.jpg?quality=75&strip=all" },
    { name: "Headphones", image: "https://www.stuff.tv/wp-content/uploads/sites/2/2022/11/Stuff-Best-Headphones-Lead-Image.png?w=1080" },
    { name: "Monitors", image: "https://image.benq.com/is/image/benqco/monitor-all-series-kv-3-m?$ResponsivePreset$&fmt=png-alpha" }
]

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

const PORT = 3000

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT)
})