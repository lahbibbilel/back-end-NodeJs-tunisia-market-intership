const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors"); // Importez le module cors
app.use(express.json());

const Anonces = require("./models/anonces"); // Correct the variable name to User

app.use(cors()); // Activez le middleware cors

//crud user
app.get("/anonces", async (req, res) => {
  try {
    const getAnonces = await Anonces.find({});
    res.status(200).json(getAnonces);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/anonces/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const anonce = await Anonces.findById(id);

    if (!anonce) {
      return res
        .status(404)
        .json({ message: `Cannot find annonce with id ${id}` });
    }

    res.status(200).json(anonce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/anonces/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const putAnonce = await Anonces.findByIdAndUpdate(id, req.body);
    if (!putAnonce) {
      return res.status(404).json({ message: `cannot find id + ${id}` });
    }
    const updateAnonce = await Anonces.findById(id);
    res.status(200).json(putAnonce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/anonces", async (req, res) => {
  try {
    const newAnonce = await Anonces.create(req.body); // Correct the variable name to User
    res.status(200).json(newAnonce);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/anonces/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAnonce = await Anonces.findByIdAndRemove(id);

    if (!deleteAnonce) {
      return res
        .status(404)
        .json({ message: `Cannot find annonce with id ${id}` });
    }

    res.status(200).json({ message: `Annonce with id ${id} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://lahbibbilel:lahbibbilel@back-node.kmuw3yj.mongodb.net/node-to-ionic-api?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    console.log("connected to mongoDb");
  })
  .catch((error) => {
    console.log("error");
  });
