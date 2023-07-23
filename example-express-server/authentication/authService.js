const jwt = require('jsonwebtoken');
const config = require('../config');
const axios = require('axios');

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

function getGITHUBAccessToken(code, done) {
  const body = {
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code: code,
  };
  const opts = { headers: { accept: 'application/json' } };

  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((response) => response.data.access_token)
    .then((token) => done(undefined, token))
    .catch((err) => {
      done({ err: err.message });
    });
}

module.exports = {
  verifyUser,
  createJWT,
  getGITHUBAccessToken,
};
