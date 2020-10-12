import express, { response } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

const app = express();

// Custom Routes
const searchSub = require("./MailerLite/search");
const getSubscribers = require("./Moosend/getSubscribers");
const getSub = require("./MailerLite/getSub");
const searchContact = require("./SendFox/searchContact");
const addContact = require("./SendFox/addContact");

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

// Getting subscribers from MailerLite
app.get("/mailerlite", (req, res) => {
  getSub(req.body.mAPIKEY)
    .then((result: Array<any>) => {
      res.json(result);
    })
    .catch((err: {}) => res.json(err));
});

// Search and Update Subscribers in MailerLite
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

// Searching SendFox for contacts
app.get("/sendfox", (req, res) => {
  searchContact(req.body.sAPIKEY, req.body.email)
    .then((result: any) => res.json(result))
    .catch((err: {}) => res.json(err));
});

app.post("/sendfox", (req, res) => {
  addContact(req.body)
    .then((result: any) => {
      res.json({
        id: result.result.id,
        name: result.result.first_name,
        email: result.result.email,
        status: result.status,
        msg: result.msg,
      });
    })
    .catch((err: {}) => {
      res.json(err);
    });
});

app.post("/syncLite", (req, res) => {
  let data: Array<any> = [];
  const sAPIKEY = req.body.sAPIKEY;
  getSub(req.body).then((resultOne: Array<any>) => {
    var addLoop = new Promise((resolve, reject) => {
      resultOne.forEach((element: any) => {
        searchContact(sAPIKEY, element.email).then((resultTwo: any) => {
          if (resultTwo.status === true) {
            addContact(sAPIKEY, element).then((resultThree: any) => {
              let final = {
                id: resultThree.result.id,
                name: resultThree.result.first_name,
                email: resultThree.result.email,
                status: resultThree.status,
                msg: resultThree.msg,
              };
              data.push(final);
            });
          }
        });
      });
    });
  });
});

app.listen("3000", () => {
  console.log("Server is running");
});
