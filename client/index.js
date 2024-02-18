import client from "./client.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      res.send(data.customers);
    }
  });
});
app.post("/create", (req, res) => {});
app.post("/update", (req, res) => {});
app.post("/remove", (req, res) => {});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER IS LISTNEING ON PORT ${PORT}`);
});
