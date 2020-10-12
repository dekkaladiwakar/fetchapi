import axios from "axios";

const getSub = (mAPIKEY: string) => {
  return axios({
    method: "get",
    url: `https://api.mailerlite.com/api/v2/subscribers`,
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": mAPIKEY,
    },
  })
    .then((res) => {
      //console.log(res);
      const result = res.data;
      const data: Array<any> = [];
      result.forEach((element: { name: string; email: string }) => {
        data.push({ name: element.name, email: element.email });
      });

      return Promise.resolve(data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = getSub;
