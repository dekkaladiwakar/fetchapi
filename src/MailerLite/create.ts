import axios from "axios";

const createSub = (
  input: {
    Email: string;
    Name: string;
  },
  mAPIKEY: string
) => {
  return axios({
    method: "post",
    url: "https://api.mailerlite.com/api/v2/subscribers",
    data: {
      email: input.Email,
      name: input.Name,
    },
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": mAPIKEY,
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
