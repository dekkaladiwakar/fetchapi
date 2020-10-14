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
const isEmpty = require("./is-empty");

// Body Parser
app.use(urlencoded({ extended: false }));
app.use(json());

//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Syncing Moosend with MailerLite
app.get("/sync", (req, res) => {
  let data: Array<any> = [];
  const mAPIKEY = !isEmpty(req.body.mAPIKEY) ? req.body.mAPIKEY : "";
  getSubscribers(req.body)
    .then((result: Array<any>) => {
      result.every((element) => {
        searchSub(element, mAPIKEY)
          .then((results: any) => {
            data.push(results);
            if (data.length === result.length) res.json(data);
          })
          .catch((err: {}) => {
            res.json(err);
          });
      });
    })
    .catch((err: {}) => {
      res.json(err);
    });
});

// Syncing MailerLite with SendFox
app.post("/syncLite", (req, res) => {
  let data: Array<any> = [];
  const sAPIKEY = req.body.sAPIKEY;
  let counter = 0;
  let counterFail = 0;
  const mAPIKEY = !isEmpty(req.body.mAPIKEY) ? req.body.mAPIKEY : "";
  getSub(mAPIKEY)
    .then((resultOne: Array<any>) => {
      resultOne.every((element: any) => {
        searchContact(sAPIKEY, element.email)
          .then((resultTwo: any) => {
            if (resultTwo.status === false) {
              addContact(sAPIKEY, element)
                .then((resultThree: any) => {
                  let final = {
                    id: resultThree.result.id,
                    name: resultThree.result.first_name,
                    email: resultThree.result.email,
                    status: resultThree.status,
                    msg: resultThree.msg,
                  };
                  data.push(final);
                  counter++;
                  if (counter === resultOne.length) {
                    res.json({
                      data: data,
                      msg: `${counterFail} out of ${resultOne.length} contacts already exists.`,
                    });
                  }
                })
                .catch((err: {}) => res.json(err));
            } else {
              counter++;
              counterFail++;
              if (counter === resultOne.length) {
                res.json({
                  data: data,
                  msg: `${counterFail} out of ${resultOne.length} contacts already exists.`,
                });
              }
            }
          })
          .catch((err: {}) => {
            res.json(err);
          });
      });
    })
    .catch((err: {}) => {
      res.json(err);
    });
});

app.listen("3000", () => {
  console.log("Server is running");
});
