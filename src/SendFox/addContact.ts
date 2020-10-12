import axios from "axios";

const addContact = (input: any) => {
  return axios({
    method: "post",
    url: "https://api.sendfox.com/contacts",
    data: {
      email: input.email,
      first_name: input.name,
    },
    headers: {
      Authorization: "Bearer " + input.sAPIKEY,
    },
  })
    .then((res: any) => {
      return Promise.resolve({
        result: res.data,
        status: true,
        msg: "Contanct Added",
      });
    })
    .catch((err) => {
      return Promise.reject({ errror: err, msg: "Please check your token." });
    });
};

module.exports = addContact;
