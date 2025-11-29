import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

const products = [
  // ===================== Painkillers & Fever =====================
  { name: "Paracetamol", price: 20, image: "/assets/img1.jpg" },
  { name: "Dolo-650", price: 30, image: "/assets/img2.jpeg" },
  { name: "Crocin Advance", price: 25, image: "/assets/img3.webp" },
  { name: "Ibuprofen", price: 40, image: "/assets/img4.webp" },
  { name: "Aspirin", price: 50, image: "/assets/img5.jpg" },
  { name: "Naproxen", price: 55, image: "/assets/img6.webp" },
  { name: "Diclofenac", price: 60, image: "/assets/img7.png" },

  // ===================== Antibiotics =====================
  { name: "Amoxicillin Capsules", price: 220, image: "/assets/img8.webp" },
  { name: "Azithromycin", price: 250, image: "/assets/img9.jpg" },
  { name: "Ciprofloxacin", price: 300, image: "/assets/img10.webp" },
  { name: "Metronidazole", price: 180, image: "/assets/img11.webp" },
  { name: "Doxycycline", price: 210, image: "/assets/img12.jpg" },
  { name: "Levofloxacin", price: 280, image: "/assets/img13.webp" },

  // ===================== Syrups =====================
  { name: "Cough Syrup", price: 120, image: "/assets/img14.png" },
  { name: "Digestive Syrup", price: 140, image: "/assets/img15.webp" },
  { name: "Iron Syrup", price: 160, image: "/assets/img16.jpg" },
  { name: "Calcium Syrup", price: 170, image: "/assets/img17.png" },

  // ===================== Vitamins & Supplements =====================
  { name: "Vitamin C Tablets", price: 150, image: "/assets/img18.jpg" },
  { name: "Multivitamin Tablets", price: 300, image: "/assets/img19.avif" },
  { name: "Zinc Tablets", price: 90, image: "/assets/img20.webp" },
  { name: "Omega-3 Capsules", price: 350, image: "/assets/img21.png" },
  { name: "Calcium Tablets", price: 200, image: "/assets/img22.webp" },
  { name: "Protein Powder", price: 600, image: "/assets/img23.webp" },

  // ===================== Daily Essentials =====================
  { name: "ORS Powder", price: 40, image: "/assets/img24.webp" },
  { name: "Hand Sanitizer", price: 50, image: "/assets/img25.jpg" },
  { name: "Surgical Mask (Pack of 50)", price: 150, image: "/assets/img26.jpg" },
  { name: "Bandages", price: 40, image: "/assets/img27.png" },
  { name: "Antiseptic Liquid", price: 180, image: "/assets/img28.webp" },
  { name: "Cotton Roll", price: 70, image: "/assets/img29.png" },
  { name: "Dettol Soap", price: 40, image: "/assets/img30.jpeg" },

  // ===================== Medical Devices =====================
  { name: "Blood Pressure Monitor", price: 1200, image: "/assets/img31.jpg" },
  { name: "Digital Thermometer", price: 250, image: "/assets/img32.jpg" },
  { name: "Glucometer", price: 900, image: "/assets/img33.jpg" },
  { name: "Pulse Oximeter", price: 700, image: "/assets/img34.webp" },
  { name: "Nebulizer Machine", price: 1500, image: "/assets/img35.png" },
  { name: "Weighing Scale", price: 650, image: "/assets/img36.jpeg" },
  { name: "Stethoscope", price: 450, image: "/assets/img37.jpeg" },

  // ===================== Injections =====================
  { name: "Insulin Injection", price: 400, image: "/assets/img38.jpg" },
  { name: "Vitamin B12 Injection", price: 350, image: "/assets/img39.webp" },
  { name: "Tetanus Injection", price: 300, image: "/assets/img40.jpg" },

  // ===================== Baby Care =====================
  { name: "Baby Powder", price: 180, image: "/assets/img41.jpg" },
  { name: "Baby Lotion", price: 220, image: "/assets/img42.webp" },
  { name: "Baby Diapers", price: 500, image: "/assets/img43.png" },
  { name: "Baby Wipes", price: 120, image: "/assets/img44.webp" },

  // ===================== Skin Care & Others =====================
  { name: "Moisturizer", price: 250, image: "/assets/img45.jpg" },
  { name: "Sunscreen Lotion", price: 300, image: "/assets/img46.webp" },
  { name: "Aloe Vera Gel", price: 200, image: "/assets/img47.webp" },

  // ===================== Ayurvedic =====================
  { name: "Chyawanprash", price: 350, image: "/assets/img48.jpg" },
  { name: "Ashwagandha Tablets", price: 400, image: "/assets/img49.jpg" },
  { name: "Giloy Juice", price: 220, image: "/assets/img50.jpg" },
  { name: "Tulsi Drops", price: 180, image: "/assets/img51.jpg" },

  // ===================== First Aid =====================
  { name: "Pain Relief Spray", price: 200, image: "/assets/img52.avif" },
  { name: "Inhaler", price: 350, image: "/assets/img53.jpg" },
  { name: "Surgical Gloves (Box)", price: 250, image: "/assets/img54.jpg" },
  { name: "IV Cannula", price: 60, image: "/assets/img55.png" },
  { name: "First Aid Kit", price: 500, image: "/assets/img56.jpg" },

  // ===================== Others =====================
  { name: "Nasal Spray", price: 180, image: "/assets/img57.webp" },
  { name: "Eye Drops", price: 90, image: "/assets/img58.jpeg" },
  { name: "Ear Drops", price: 85, image: "/assets/img59.jpeg" },
  { name: "Cold & Flu Tablets", price: 150, image: "/assets/img60.jpg" },
  { name: "Antacid Tablets", price: 130, image: "/assets/img61.webp" },
  { name: "Lactose Free Milk Powder", price: 400, image: "/assets/img62.jpeg" },
  { name: "Protein Bars", price: 250, image: "/assets/img63.webp" },
  { name: "Electrolyte Drink", price: 70, image: "/assets/img64.jpg" },
  { name: "Energy Drink Powder", price: 160, image: "/assets/img65.jpg" },
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      await Product.deleteMany();
      await Product.insertMany(products);
      console.log("✅ Products seeded successfully");
    } catch (err) {
      console.error("❌ Seeding failed:", err.message);
    } finally {
      mongoose.connection.close();
      console.log("🔌 MongoDB connection closed");
    }
  })
  .catch(err => console.error("❌ MongoDB connection error:", err.message));
