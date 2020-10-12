import axios from "axios";

const getSubscribers = (input: any) => {
  return axios({
    method: "get",
    url: `https://api.moosend.com/v3/lists/${input.mailingId}/subscribers/Subscribed.json?apikey=${input.APIKEY}`,
    //headers: { "Access-Control-Allow-Origin": true },
  })
    .then((res) => {
      const result = res.data.Context.Subscribers;
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = getSubscribers;
