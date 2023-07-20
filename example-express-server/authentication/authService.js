const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyUser(userLoginDetails, userData) {
  if (
    userLoginDetails.email === userData.email &&
    userLoginDetails.password === userData.password
  ) {
    return true;
  }
  return false;
}

function createJWT(userData) {
  const payload = {
    role: 'USER',
    email: userData.email,
    name: userData.userName,
  };

  const jwtToken = jwt.sign(payload, config.AUTH_SECRET, {
    expiresIn: 3600,
  });

  return jwtToken;
}

module.exports = {
  verifyUser,
  createJWT,
};
