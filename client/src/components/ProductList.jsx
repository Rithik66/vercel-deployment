import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { setCart } = useContext(CartContext); // use setCart to update cart state

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        productId,
        quantity: 1,
      });
      alert("✅ Product added to cart");
      console.log("Cart:", res.data);

      // Backend returns { cart: [...] }
      setCart(res.data.cart);
    } catch (err) {
      console.error("❌ Add to cart error:", err.response?.data || err.message);
      alert("Failed to add to cart");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Link to={`/products/${p._id}`} style={{ textDecoration: "none", color: "black" }}>
              <img src={p.image} alt={p.name} width="150" />
              <h3>{p.name}</h3>
            </Link>
            <p>₹{p.price}</p>
            <button
              onClick={() => addToCart(p._id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
