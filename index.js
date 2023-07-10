require('dotenv').config()
const express = require("express");
const port = 5000;

const mongoose = require("mongoose");
const cn = process.env.DB;
if (!cn) {
  throw new Error("missing env variable DB");
}

console.log(`connecting to: ${cn}`);
mongoose.connect(cn);
console.log("connected");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Archivos estáticos
app.use(express.static("static"));

// Index
app.get("/", (req, res) => {
  res.sendFile("pages/index.html", { root: __dirname });
});

// Productos
app.get("/productos", (req, res) => {
  res.sendFile("pages/productos.html", { root: __dirname });
});
//
// Productos
app.post("/pedidos", (req, res) => {
  console.log("Entró pedido", req.body);
  res.send(req.body);
});

// Contacto
app.get("/contacto", (req, res) => {
  res.sendFile("pages/contacto.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Sirviendo en puerto: ${port}...`);
});
