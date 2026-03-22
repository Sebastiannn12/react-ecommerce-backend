const path = require("path");
const express = require("express");
const cors = require("cors");
const products = require("./data/products");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../react-ecommerce/public/images')));
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/categories", (req, res) => {
  // Extract unique categories, filter out nulls, and sort alphabetically
  const uniqueCategories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));
  
  res.json(["All", ...uniqueCategories]);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.get("/", (req, res) => {
  res.send("Fifty-Glaze Gaming API is running...");
});

app.listen(5000, () => {
  console.log("Backend server running at http://localhost:5000");
});