import express, { response } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

const app = express();

// Custom Routes
const searchSub = require("./search");
const getSubscribers = require("./getSubscribers");

// Body Parser
app.use(urlencoded({ extended: false }));
app.use(json());

//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Test Route
app.get("/", (req, res) => {
  res.send("Route Working");
});

// Getting subscribers from Moosend.
app.get("/moosend", (req, resp) => {
  getSubscribers(req.body)
    .then((res: any) => resp.json(res))
    .catch((err: any) => resp.json(err));
});

// Search and Update Subscribers
app.post("/mailerlite", (req, resp) => {
  const mAPIKEY = req.body.mAPIKEY;
  const result = { Email: req.body.email, Name: req.body.name };
  searchSub(result, mAPIKEY)
    .then((result: any) => {
      resp.json(result);
    })
    .catch((err: any) => {
      resp.json(err);
    });
});

// Syncing Moosend with MailerLite
app.get("/sync", (req, res) => {
  let data: Array<any> = [];
  getSubscribers(req.body)
    .then((result: Array<any>) => {
      const mAPIKEY = req.body.mAPIKEY;
      result.forEach((element) => {
        searchSub(element, mAPIKEY)
          .then((results: any) => {
            data.push(results);
            if (data.length === result.length) res.json(data);
          })
          .catch((err: {}) => res.json(err));
      });
    })
    .catch((err: {}) => res.json(err));
});

app.listen("3000", () => {
  console.log("Server is running");
});
