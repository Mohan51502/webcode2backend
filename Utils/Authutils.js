const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const SECRET_KEY = "AUTH_MODULE";


async function hashString(data = "", rounds = 10) {
  let hashed = await bcrypt.hash(data, rounds);
  return hashed;
}

async function compareStrings(str1, str2) {
  let match = await bcrypt.compare(str1, str2);
  return match;
}

async function generateJSONToken(data = {}) {
  let token = await jwt.sign(data, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return token;
}

async function verifyToken(token = "") {
  try {
    let unsignedData = await jwt.verify(token, SECRET_KEY);
    return {
      success: true,
      ...unsignedData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.toString(),
    };
  }
}

module.exports = {
  hashString,
  compareStrings,
  generateJSONToken,
  verifyToken,
};