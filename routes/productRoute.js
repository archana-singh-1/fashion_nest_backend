import mongoose from 'mongoose';
import router from 'express'
import product from '../model/product.js';
import Cart from '../model/cartSchema.js';


const route=router()

route.get("/product", async (req, res) => {
    const products = await product.find().maxTimeMS(5000);;
    res.send(products);
    console.log("get products")
});

route.get("/search", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim() === "") {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });

        res.json(products.length ? products : { message: "No matching products found" });
    } catch (error) {
        console.error("Error in search:", error);
        res.status(500).json({ message: "Server error" });
    }
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

route.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;  
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID format" });
        }

        const updatedProduct = await product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: "Failed to update product", details: error.message });
}

});
const getEstimatedDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split("T")[0];
}
route.post("/add-to-cart", async (req, res) => {
    const { productId, name, price, image } = req.body;

    const newCartItem = new Cart({
        productId,
        name,
        price,
        image,
        estimatedDelivery: getEstimatedDeliveryDate(),
    });

    await newCartItem.save();
    res.json({ message: "Item added to cart successfully", newCartItem });
});


route.get("/cart-items", async (req, res) => {
    const cartItems = await Cart.find();
    res.json(cartItems);
});

export default route;


