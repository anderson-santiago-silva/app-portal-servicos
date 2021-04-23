const { nameValidation, phoneValidation, passwordValidation, emailValidation } = require('./fields.authentication');

const authenticationSignup = (name, phone, email, password) => {
const errorsObj = {};

const userNameErrors = nameValidation(name);
  if (userNameErrors.length > 0) {
    errorsObj.userNameErrors = userNameErrors;
  }

const userPhoneErrors = phoneValidation(phone);
  if (userPhoneErrors.length > 0) {
    errorsObj.userPhoneErrors = userPhoneErrors;
  }

const userEmailErrors = emailValidation(email);
  if (userEmailErrors.length > 0) {
    errorsObj.userEmailErrors = userEmailErrors;
  }

const userPasswordErrors = passwordValidation(password);
  if (userPasswordErrors.length > 0) {
    errorsObj.userPasswordErrors = userPasswordErrors;
  }

return errorsObj;
}

module.exports = {
  authenticationSignup,
};
