const bcrypt = require("bcrypt");
const password = "savi!!@1230!";

// hashcode+salt
// async function Hashing() {
//   console.time("hash");
//   const hashpass = await bcrypt.hash(password, 10);
//   console.timeEnd("hash");
//   console.log(hashpass);
// }
// Hashing();

async function Hashing() {
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(password, salt);

  const ans = await bcrypt.compare(password, hashpass);
  console.log(ans);

  //    console.log(salt)
  //   console.log(hashpass);
}
Hashing();

// same password but different salt
// $2b$10$db7JlN7J7zL0cWvwqj27oOIER//pGNwRvbBry0/VQ3hGD3rxCvoqO
// $2b$10$JWMAvaFC2LTlVTm827XJ1u.YgsS5iW1dLtCnOQMpss5oXenBPbLOq
