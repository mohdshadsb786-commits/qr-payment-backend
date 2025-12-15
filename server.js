const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================== TEMP DATA (abhi simple) ==================
let products = [
  { id: 1, name: "Steel Almirah 3 Door", price: 11500 },
  { id: 2, name: "Steel Baksha Heavy", price: 4200 }
];

// ================== ADMIN LOGIN (simple) ==================
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// ================== ROOT CHECK ==================
app.get("/", (req, res) => {
  res.send("Furniture Backend is LIVE ✅");
});

// ================== PUBLIC API ==================
app.get("/products", (req, res) => {
  res.json(products);
});

// ================== ADMIN LOGIN ==================
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Admin login successful"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });
});

// ================== ADD PRODUCT ==================
app.post("/admin/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: "Name & price required" });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price
  };

  products.push(newProduct);

  res.json({
    success: true,
    product: newProduct
  });
});

// ================== DELETE PRODUCT ==================
app.delete("/admin/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter(p => p.id !== id);

  res.json({ success: true });
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
