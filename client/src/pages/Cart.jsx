import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  // ✅ Calculate total safely
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>🛒 Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{item.productId?.name || "Unnamed Product"}</h3>
              <p>₹{item.productId?.price || 0}</p>
              <p>Quantity: {item.quantity}</p>

              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  padding: "5px 10px",
                  background: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>

          <Link to="/checkout">
            <button
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                marginTop: "15px",
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
