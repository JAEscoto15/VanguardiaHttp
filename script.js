import express from "express";
import { readFileSync, writeFileSync } from "fs";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/getUsers", async (req, res) => {
  try {
    const jsonData = JSON.parse(readFileSync("users.json", "utf8"));
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/postUser", (req, res) => {
  try {
    const nuevoUser = req.body;

    if (!nuevoUser || Object.keys(nuevoUser).length === 0) {
      return res.status(400).json({ error: "Llenar los datos" });
    }

    const jsonData = JSON.parse(readFileSync("users.json", "utf8"));
    jsonData.push(nuevoUser);

    writeFileSync("users.json", JSON.stringify(jsonData, null, 2));
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.put("/updateUser/:id", (req, res) => {
  try {
    const id = +req.params.id;
    const nuevoUser = req.body;

    if (!nuevoUser || Object.keys(nuevoUser).length === 0) {
      return res.status(400).json({ error: "Llenar los datos" });
    }

    const jsonData = JSON.parse(readFileSync("users.json", "utf8"));
    const usuarioExistente = jsonData.find((usuario) => usuario.id === id);

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    Object.assign(usuarioExistente, nuevoUser);

    writeFileSync("users.json", JSON.stringify(jsonData, null, 2));

    res.json(usuarioExistente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor funca en el puerto ${port}`);
});
