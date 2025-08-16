const validator = require("validator");

function validateUser(data) {
  // validate kya uske under firstname h ya nhi , agr nhi to aage nhi jane dega, kyu ki faltu me db
  // api level pr data validate- user exprience better ho jayega
  const mandatoryField = ["firstName", "emailId", "age", "password"];
  const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

  if (!IsAllowed) {
    throw new Error("Fields Missing");
  }
  if (!validator.isEmail(data.emailId)) throw new Error("Invalid Email");

  if (!validator.isStrongPassword(data.password))
    throw new Error("Weak Password");

  if (!(data.firstName.length >= 3 && data.firstName.length <= 20))
    throw new Error("Name should have atleast 3 character and atmost 20");

  // password validation karege
  // firstName 3 > max = 20 , email me @
}
module.exports = validateUser;
