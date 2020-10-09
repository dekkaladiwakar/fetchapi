import express from "express";
import bodyParser from "body-parser";

const app = express();

app.get("/", (req, res) => {
  res.send("Route Working");
});

app.listen("3000", () => {
  console.log("Server is running");
});
