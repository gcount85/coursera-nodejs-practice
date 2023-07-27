const express = require('express');
const config = require('../config');
const router = express.Router();
const oauthCtrl = require('./auth.controller');

// redirects the login to consent authorization screen from github
router.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`
  );
});

// Callback url to which github oauth code is sent
router.get('/callback', (req, res) => {
  // Return the token in cookie
  // Data should be sent either in cookie or in session storage
  try {
    if (req.cookies?.token) {
      const token = req.cookies.token;
      oauthCtrl.getAccessTokenOfUser(token, (err, userData) => {
        if (err) {
          return res.status(401).send({ error: 'Unauthorized1' });
        }
        return res.redirect(`/index.html?token=${token}`);
      });
    } else if (req.query?.code) {
      oauthCtrl.oauthProcessor(req.query.code, (err, token) => {
        if (err) {
          return res.status(401).send({ error: 'Unauthorized2' });
        }
        return res
          .cookie('token', token, { maxAge: 1000000 })
          .redirect(`/index.html?token=${token}`);
      });
    } else {
      return res.status(401).send({ error: 'Unauthorized3' });
    }
  } catch (err) {
    return res.status(500).send({ error: 'unexpected error' });
  }
});

module.exports = router;
