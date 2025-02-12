import router from 'express'
import product from '../model/product.js';

const route=router()

route.get("/product", async (req, res) => {
    const products = await product.find().maxTimeMS(5000);;
    res.json(products);
    console.log("get products")
});


route.post("/post", async (req, res) => {
    try {
        const { name, price, description, image, category, stock } = req.body;

    
        if (!name || !price || !description || !image || !category || !stock) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newProduct = new product({ name, price, description, image, category, stock });

        await newProduct.save();

        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Failed to add product", details: error.message });
    }
});

export default route;


