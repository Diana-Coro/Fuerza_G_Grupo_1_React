 const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let unidades = [
  {
    id: 1,
    unidad: "101",
    descripcion: "Administración Central",
    ciudad: "La Paz",
  },
  {
    id: 2,
    unidad: "102",
    descripcion: "Recursos Humanos",
    ciudad: "Potosí",
  },
];

app.get("/api/unidadadmin", (req, res) => {
  res.json(unidades);
});

app.post("/api/unidadadmin", (req, res) => {
  const nuevaUnidad = {
    id: Date.now(),
    ...req.body,
  };

  unidades.push(nuevaUnidad);
  res.status(201).json(nuevaUnidad);
});

app.put("/api/unidadadmin/:id", (req, res) => {
  const id = Number(req.params.id);

  unidades = unidades.map((item) =>
    item.id === id ? { ...item, ...req.body, id } : item
  );

  res.json({ mensaje: "Unidad actualizada correctamente" });
});

app.delete("/api/unidadadmin/:id", (req, res) => {
  const id = Number(req.params.id);

  unidades = unidades.filter((item) => item.id !== id);

  res.json({ mensaje: "Unidad eliminada correctamente" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
