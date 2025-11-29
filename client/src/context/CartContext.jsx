import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      setCart(res.data.cart || []); // backend sends { cart: [...] }
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    }
  };

  // ✅ Add to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        productId,
        quantity,
      });
      setCart(res.data.cart || []); // update cart instantly
    } catch (err) {
      console.error("❌ Add to cart error:", err);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCart(res.data.cart || []); // backend should return updated cart
    } catch (err) {
      console.error("❌ Remove from cart error:", err);
    }
  };

  // load cart when app starts
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
