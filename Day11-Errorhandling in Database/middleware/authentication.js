// Aunthentication admin here - middlware
  //   add item into food menu
  // authentication krna pdhega ki kya admin hi h
  // dummy code for authentication

  const auth = (req, res, next) => {
  const token = "ABCDEF";
  const Access = token === "ABCDEF" ? 1 : 0;

  if (!Access) {
    return res.status(403).send("No Permission");
  }

  next();  // Only called if access is granted
};

module.exports = { auth };



