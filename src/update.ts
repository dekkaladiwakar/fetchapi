import axios from "axios";

const updateSub = (input: any) => {
  return axios({
    method: "put",
    url: `https://api.mailerlite.com/api/v2/subscribers/${input.email}`,
    data: {
      name: input.name,
      type: input.subscription,
    },
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": input.APIKEY,
    },
  })
    .then((res) => {
      return Promise.resolve("Successfully Updated");
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = updateSub;
