import express, { response } from "express";
import bodyParser, { json } from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Test Route
app.get("/", (req, res) => {
  res.send("Route Working");
});

app.get("/moosend", (req, resp) => {
  axios({
    method: "get",
    url:
      "https://api.moosend.com/v3/lists/c5797152-2a99-4169-b8f8-d42eeb190cca/subscribers/Subscribed.json?apikey=b3087414-6f72-4972-a01e-65c064359a5e",
    //headers: { "Access-Control-Allow-Origin": true },
  })
    .then((res) => {
      const result = res.data.Context.Subscribers;
      resp.json(result);
    })
    .catch((err) => {
      resp.json(err);
    });
});

app.get("/mailerlite", (req, resp) => {
  axios({
    method: "post",
    url: "https://api.mailerlite.com/api/v2/subscribers",
    data: {
      email: "testcase3@testcase3.com",
      name: "testcase3",
    },
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": "2c200c8f9fe5da17c601e5e2256e52c6",
    },
  })
    .then((res) => {
      const result = res.data;
      resp.json(result);
    })
    .catch((err) => {
      const error = err;
      resp.json(error);
    });
});

app.listen("3000", () => {
  console.log("Server is running");
});
