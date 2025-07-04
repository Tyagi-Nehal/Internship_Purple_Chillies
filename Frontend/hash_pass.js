const bcrypt = require("bcrypt");

const plainPassword = "support12";

console.log("⏳ Hashing password...");

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log("✅ Hashed password:", hash);
});
