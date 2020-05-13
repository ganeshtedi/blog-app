const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateSignUpInput = data => {
   let errors = {};

   let { user_name, email, password } = data;
      user_name = !isEmpty(user_name) ? user_name : "";
   email = !isEmpty(email) ? email : "";
   password = !isEmpty(password) ? password : "";

   if (validator.isEmpty(user_name)) {
      errors.user_name = "Username is required";
   }

   if (validator.isEmpty(email)) {
      errors.email = "Email is required";
   } else if (!validator.isEmail(email)) {
      errors.email = "Enter a valid email id";
   }

   if (validator.isEmpty(password)) {
      errors.password = "Password is required";
   } else if (!validator.isLength(password, { min: 6, max: 20 })) {
      errors.password = "Password must be at least 6 characters";
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};