import { Link } from "react-router-dom";
import img1 from "../assets/3.jpg"; 
import img2 from "../assets/medicines.jpeg"; 
import img3 from "../assets/syrup.jpeg"; 
import img4 from "../assets/equipment.jpeg"; 
import img5 from "../assets/wellness.jpeg";
import img6 from "../assets/Paracetamol.jpeg"; 
import img7 from "../assets/Cough.jpeg"; 
import img8 from "../assets/firstaidkit.jpeg";  

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "40px", background: "#f5f5f5" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Welcome to Medical Shop</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Your trusted online pharmacy. Browse medicines, health products and more.
        </p>

        {/* Use imported image */}
        <img
          src={img1}
          alt="Banner"
          style={{ borderRadius: "10px", width: "90%", maxWidth: "1000px" }}
        />

        <br />
        <Link to="/products">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1rem",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </Link>
      </section>

      {/* Categories Section */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Shop by Categories</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          {[
            { name: "Tablets", image: img2 },
            { name: "Syrups", image: img3 },
            { name: "Equipment", image: img4 },
            { name: "Wellness", image: img5 },
          ].map((cat, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                width: "200px",
                cursor: "pointer",
              }}
            >
              <img src={cat.image} alt={cat.name} style={{ width: "100%", borderRadius: "8px" }} />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: "40px", background: "#f9f9f9", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Featured Products</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          {[
            { name: "Paracetamol", price: "₹20", image: img6 },
            { name: "Cough Syrup", price: "₹120", image: img7 },
            { name: "First Aid Kit", price: "₹500", image: img8 },
          ].map((product, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                width: "200px",
              }}
            >
              <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "8px" }} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <Link to="/products">
                <button
                  style={{
                    padding: "8px 15px",
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Product
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ padding: "20px", textAlign: "center", background: "#333", color: "#fff" }}>
        <p>© {new Date().getFullYear()} Medical Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}


