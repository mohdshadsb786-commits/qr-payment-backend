
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Furniture Backend is LIVE ✅");
});

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Steel Almirah 3 Door",
      price: 11500
    },
    {
      id: 2,
      name: "Steel Baksha Heavy",
      price: 4200
    }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
