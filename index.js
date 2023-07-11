require("dotenv").config();
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
const pedidoSchema = new mongoose.Schema({
  items: Array,
  ts: String,
  total: Number,
});
const Pedido = mongoose.model("Pedido", pedidoSchema);

const app = express();
//app.use(express.urlencoded({ extended: false }));
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

// Pedidos
app.post("/pedidos", async (req, res) => {
  console.log("Entró pedido", req.body);
  // Había datos?
  if (!req.body) {
    res.status(400).send("Pedido inválido");
    return;
  }
  // Había items?
  if (!req.body.length) {
    res.status(400).send("El pedido no contenía ningún item");
    return;
  }
  const pedido = {};
  pedido.ts = new Date().toJSON();
  pedido.items = req.body;
  const model = new Pedido(pedido);
  await model.save();
});

// Pedidos get
app.get("/pedidos", async (req, res) => {
  console.log("Entró solicitud pedido");
  const pp = await Pedido.find();
  res.send(pp);
});

// Contacto
app.get("/contacto", (req, res) => {
  res.sendFile("pages/contacto.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Sirviendo en puerto: ${port}...`);
});
