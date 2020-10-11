import axios from "axios";

const searchSub = (input: any) => {
  new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.mailerlite.com/api/v2/subscribers/search?query=${input.email}`,
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": input.APIKEY,
      },
    })
      .then((result) => {
        if (result.data.length === 0) {
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
              const result = "Successfully Created.";
              console.log(result);
              resolve(result);
            })
            .catch((err) => reject(err));
        } else {
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
              const result = "Successfully Updated.";
              console.log(result);
              resolve(result);
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
};

module.exports = searchSub;
