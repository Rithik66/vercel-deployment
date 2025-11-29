import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {(!cart || cart.length === 0) ? (
        <p>🛒 Cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item._id} // _id from Cart schema
              style={{
                border: "1px solid #ddd",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {/* ✅ Safely check product details */}
              <h3>{item.productId?.name || "Unknown Product"}</h3>
              <p>₹{item.productId?.price ?? "N/A"}</p>
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
        </div>
      )}
    </div>
  );
}
