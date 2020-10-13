import axios from "axios";

const createSub = require("./create");
const updateSub = require("./update");

const searchSub = (
  result: {
    Email: string;
    Name: string;
  },
  mAPIKEY: string
) => {
  return axios({
    method: "get",
    url: `https://api.mailerlite.com/api/v2/subscribers/search?query=${result.Email}`,
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": mAPIKEY,
    },
  })
    .then((res) => {
      return new Promise((resolve, reject) => {
        if (res.data.length === 0) {
          createSub(result, mAPIKEY)
            .then((resp: string) => {
              resolve("Email : " + result.Email + " -> " + resp);
            })
            .catch((err: {}) => {
              reject(err);
            });
        } else {
          updateSub(result, mAPIKEY)
            .then((resp: string) => {
              resolve("Email : " + result.Email + " -> " + resp);
            })
            .catch((err: {}) => {
              reject(err);
            });
        }
      });
    })
    .catch((err) => {
      return Promise.reject({
        error: err.statusCode,
        msg: "Authetication Error",
      });
    });
};

module.exports = searchSub;
