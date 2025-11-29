import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Fetch all products
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "❌ No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while fetching products", error: error.message });
  }
});

export default router;
