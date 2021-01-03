const crypto = require("crypto");
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");

// TODO
function validPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVerify;
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function issueJwt(user) {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    lat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, "jwt-example", {
    expiresIn: expiresIn,
    // algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJwt = issueJwt;
