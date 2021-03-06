import axios from "axios";

const getSubscribers = (input: any) => {
  return axios({
    method: "get",
    url: `https://api.moosend.com/v3/lists/${input.mailingId}/subscribers/Subscribed.json?apikey=${input.APIKEY}`,
    //headers: { "Access-Control-Allow-Origin": true },
  })
    .then((res) => {
      if (res.data.Code !== 0) {
        return Promise.reject({
          error: res.data.Code,
          message: res.data.Error,
          platform: "Moosend",
        });
      } else {
        const result = res.data.Context.Subscribers;
        let details: Array<any> = [];
        result.forEach((element: { Name: string; Email: string }) => {
          details.push({ Email: element.Email, Name: element.Name });
        });
        return Promise.resolve(details);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = getSubscribers;
