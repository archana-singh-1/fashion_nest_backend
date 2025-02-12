import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    stock: Number
});
const product = mongoose.model("Product", productSchema);
export default product;
