import axios from "axios";

const createSub = require("./create");
const updateSub = require("./update");

const searchSub = (input: any) => {
  return axios({
    method: "get",
    url: `https://api.mailerlite.com/api/v2/subscribers/search?query=${input.email}`,
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": input.APIKEY,
    },
  })
    .then((result) => {
      return new Promise((resolve, reject) => {
        if (result.data.length === 0) {
          createSub(input)
            .then((res: string) => {
              resolve(res);
            })
            .catch((err: {}) => {
              reject(err);
            });
        } else {
          updateSub(input)
            .then((res: string) => {
              resolve(res);
            })
            .catch((err: {}) => {
              reject(err);
            });
        }
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = searchSub;
