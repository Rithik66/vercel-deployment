import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // calculate total quantity
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#007bff",
        color: "white",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", color: "white", fontSize: "1.5rem" }}>
        Medical Shop
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
        <Link to="/products" style={{ textDecoration: "none", color: "white" }}>Products</Link>

        {/* Cart with count */}
        <Link to="/cart" style={{ textDecoration: "none", color: "white", position: "relative" }}>
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-15px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "3px 8px",
                fontSize: "0.8rem",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
