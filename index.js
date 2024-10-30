const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Endpoint to get all data entries
app.get("/data-tekkom", (req, res) => {
  const filePath = path.join(__dirname, "data-tekkom.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to get a single entry by NIM
app.get("/data-tekkom/nim/:nim", (req, res) => {
  const filePath = path.join(__dirname, "data-tekkom.json");
  const nim = req.params.nim;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
    
    const jsonData = JSON.parse(data);
    const entry = jsonData.find((item) => item.NIM === nim);

    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  });
});


// Endpoint to get a single entry by NamaPanggilan
app.get("/data-tekkom/nickname/:namaPanggilan", (req, res) => {
  const filePath = path.join(__dirname, "data-tekkom.json");
  const namaPanggilan = req.params.namaPanggilan;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
    
    const jsonData = JSON.parse(data);
    const entry = jsonData.find((item) => item.NamaPanggilan === namaPanggilan);

    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  });
});



module.exports = app;
