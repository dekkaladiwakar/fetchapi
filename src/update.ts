import axios from "axios";

const updateSub = (input: any) => {
  new Promise((resolve, reject) => {
    axios({
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
        resolve("Successfully Updated");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = updateSub;
