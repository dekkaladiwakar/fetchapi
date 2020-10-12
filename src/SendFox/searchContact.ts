import axios from "axios";

const searchContact = (sAPIKEY: string, email: string) => {
  return axios({
    method: "get",
    url: `https://api.sendfox.com/contacts?email=${email}`,
    headers: {
      Authorization: "Bearer " + sAPIKEY,
    },
  })
    .then((res: any) => {
      const result = res.data.data;
      if (result.length !== 0) {
        return Promise.resolve({ status: true, msg: "Contanct Exists" });
      } else {
        return Promise.resolve({ status: false, msg: "Contact Doesn't exist" });
      }
    })
    .catch((err) => {
      return Promise.reject({ msg: "Please check your token." });
    });
};

module.exports = searchContact;
