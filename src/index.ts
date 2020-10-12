import express, { response } from "express";
import bodyParser, { json } from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();

// Custom Routes
const searchSub = require("./search");
const getSubscribers = require("./getSubscribers");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Test Route
app.get("/", (req, res) => {
  res.send("Route Working");
});

app.get("/sync", (req, res) => {
  getSubscribers(req.body).then().catch();
});

app.get("/moosend", (req, resp) => {
  getSubscribers(req.body)
    .then((res: any) => resp.json(res))
    .catch((err: any) => resp.json(err));
});

app.post("/mailerlite", (req, resp) => {
  searchSub(req.body)
    .then((result: any) => {
      resp.json(result);
    })
    .catch((err: any) => {
      resp.json(err);
    });
});

app.listen("3000", () => {
  console.log("Server is running");
});
