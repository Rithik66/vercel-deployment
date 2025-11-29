import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { setCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        productId,
        quantity: 1,
      });

      alert("✅ Added to cart!");
      console.log("Cart response:", res.data);

      // Update global cart context
      if (res.data.cart) {
        setCart(res.data.cart); // backend sends full cart
      } else {
        setCart((prev) => [...prev, res.data]); // fallback
      }
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
      alert("❌ Failed to add to cart");
    }
  };

  // ✅ Buy Now
  const handleBuyNow = async (productId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders/buy-now", {
        productId,
        quantity: 1,
      });
      alert("✅ Order placed successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Buy now error:", err.response?.data || err.message);
      alert("❌ Failed to place order");
    }
  };

  // ✅ Loading/Error handling
  if (loading) return <p style={{ padding: "20px" }}>Loading products...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(product._id)}
              style={{
                margin: "5px",
                padding: "8px 15px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>

            {/* Buy Now */}
            <button
              onClick={() => handleBuyNow(product._id)}
              style={{
                margin: "5px",
                padding: "8px 15px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

