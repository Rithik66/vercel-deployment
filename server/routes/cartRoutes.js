import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * @route   POST /api/cart/add
 * @desc    Add product to cart (or increase quantity if already in cart)
 * @access  Public (can later protect with auth)
 */
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate request
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "❌ Product ID and quantity are required" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    // Find item in cart
    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      // If already exists → update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Otherwise → create new entry
      cartItem = new Cart({ productId, quantity });
      await cartItem.save();
    }

    // ✅ Always return updated cart with product details populated
    const fullCart = await Cart.find().populate("productId");

    return res.status(201).json({ cart: fullCart });
  } catch (error) {
    console.error("❌ Cart add error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while adding to cart", error: error.message });
  }
});

export default router;
