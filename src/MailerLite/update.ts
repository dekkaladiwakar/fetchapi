import axios from "axios";

const updateSub = (
  input: {
    Email: string;
    Name: string;
  },
  mAPIKEY: string
) => {
  return axios({
    method: "put",
    url: `https://api.mailerlite.com/api/v2/subscribers/${input.Email}`,
    data: {
      name: input.Name,
    },
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": mAPIKEY,
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
