import axios from "axios";

const createSub = (input: any) => {
  return axios({
    method: "post",
    url: "https://api.mailerlite.com/api/v2/subscribers",
    data: {
      email: input.email,
      name: input.name,
    },
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": input.APIKEY,
    },
  })
    .then((res) => {
      return Promise.resolve("Successfully Created");
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = createSub;
