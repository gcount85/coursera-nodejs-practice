const axios = require('axios');
const config = require('../config');

// function to get the access token
async function getGithubAccessToken(code, done) {
  try {
    const body = {
      code: code,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
    };
    const opts = {
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      body,
      opts
    );
    return done(undefined, response.data.access_token);
  } catch (err) {
    return done({ error: 'unexpected error while getting access token' });
  }
}

// Function to get the user profile for the token provided
async function getAccessTokenOfUser(token, done) {
  // Github APIs are authenticated and we have to share the token in headers
  // The token is same as what we recieved in the previous step
  try {
    const opts = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`https://api.github.com/user`, opts);
    if (response.data) {
      return done(undefined, 'user identified');
    }
    return done('user not identified');
  } catch (err) {
    return done('토큰 확인 과정 에러');
  }
}

module.exports = {
  getGithubAccessToken,
  getAccessTokenOfUser,
};
