const express = require("express");
const port = 5000;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user1:mayday5563@cluster0.o2b1t6q.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

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
