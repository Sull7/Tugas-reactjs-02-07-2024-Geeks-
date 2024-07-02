const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Garuda1234",
    database: "kontak_db",
  },
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.get("/contacts", (req, res) => {
  db.select("*")
    .from("contacts")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("Unable to fetch contacts");
    });
});

app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  db("contacts")
    .insert({
      name: name,
      email: email,
      phone: phone,
    })
    .then(() => {
      res.json("Contact added successfully");
    })
    .catch((err) => {
      res.status(400).json("Unable to add contact");
    });
});

app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  db("contacts")
    .where({ id: id })
    .update({
      name: name,
      email: email,
      phone: phone,
    })
    .then(() => {
      res.json("Contact updated successfully");
    })
    .catch((err) => {
      res.status(400).json("Unable to update contact");
    });
});

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  db("contacts")
    .where({ id: id })
    .del()
    .then(() => {
      res.json("Contact deleted successfully");
    })
    .catch((err) => {
      res.status(400).json("Unable to delete contact");
    });
});
