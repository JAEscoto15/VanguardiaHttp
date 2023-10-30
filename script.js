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
    res.status(500).json({ error: "Error con el servidor" });
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
    const userExistente = jsonData.find((user) => user.id === id);

    if (!userExistente) {
      return res.status(404).json({ error: "User no encontrado" });
    }

    Object.assign(userExistente, nuevoUser);
    writeFileSync("users.json", JSON.stringify(jsonData, null, 2));
    res.json(userExistente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error con el servidor" });
  }
});

app.delete("/deleteUser/:id", (req, res) => {
  try {
    const id = +req.params.id;

    const jsonData = JSON.parse(readFileSync("users.json", "utf8"));
    const userI = jsonData.findIndex((user) => user.id === id);

    if (userI === -1) {
      return res.status(404).json({ error: "User no encontrado" });
    }

    const userEliminado = jsonData.splice(userI, 1)[0];

    writeFileSync("users.json", JSON.stringify(jsonData, null, 2));

    res.json(userEliminado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor funca en el puerto ${port}`);
});
