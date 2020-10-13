import validator from "validator";
const isEmpty = require("./is-empty");

const validateInput = (data: any) => {
  let errors: any = {};

  data.APIKEY = !isEmpty(data.APIKEY) ? data.APIKEY : "";
  data.mAPIKEY = !isEmpty(data.mAPIKEY) ? data.mAPIKEY : "";
  data.mailingId = !isEmpty(data.mailingId) ? data.mailingId : "";
  data.sAPIKEY = !isEmpty(data.sAPIKEY) ? data.sAPIKEY : "";

  if (validator.isEmpty(data.APIKEY)) {
    errors.APIKEY = "Moosend API Key is required.";
  }

  if (validator.isEmpty(data.mAPIKEY)) {
    errors.mAPIKEY = "MailerLite API Key is required.";
  }

  if (validator.isEmpty(data.sAPIKEY)) {
    errors.sAPIKEY = "SendFox Token is required.";
  }

  if (validator.isEmpty(data.mailingId)) {
    errors.mailingId = "Moosend MailingID is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateInput;
