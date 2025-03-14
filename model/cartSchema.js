import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number,
    image: String,
    estimatedDelivery: String, 
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;