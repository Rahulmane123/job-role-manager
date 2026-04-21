const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/env");

function generateToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      name: user.name
    },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn
    }
  );
}

module.exports = generateToken;
