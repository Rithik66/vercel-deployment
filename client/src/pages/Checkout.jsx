import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { cart, setCart } = useCart();

  // calculate total
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      // prepare order payload
      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId?._id,
          quantity: item.quantity,
        })),
        totalPrice,
      };

      // call backend
      const res = await axios.post("http://localhost:5000/api/orders", orderData);

      alert("✅ Order placed successfully!");
      console.log("Order response:", res.data);

      // clear cart after success
      setCart([]);

      // redirect
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Order error:", err.response?.data || err.message);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.productId?._id || item._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{item.productId?.name || "Unknown Product"}</h3>
              <p>Price: ₹{item.productId?.price || 0}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ₹{(item.productId?.price || 0) * item.quantity}</p>
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>
          <button
            onClick={placeOrder}
            style={{
              padding: "10px 20px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
