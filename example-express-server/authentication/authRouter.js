const express = require('express');
const router = express.Router();
const authController = require('./authController');
const config = require('../config');

router.post('/register', (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!(userName && email && password)) {
      return res.status(400).send('required inputs are missing');
    }
    const userDetails = {
      userName,
      email,
      password,
    };

    authController.registerUser(userDetails, (err, result) => {
      if (err) {
        return res.status(400).send({ error: 'User already exists' });
      } else {
        return res.status(201).send(result);
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'error while registering a user' });
  }
});

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send('required inputs are missing');
    }

    const userLoginDetails = { email, password };

    authController.loginUser(userLoginDetails, (err, result) => {
      if (err) {
        return res.status(401).send({ error: 'invaild credentials' });
      } else {
        return res.status(200).send(result);
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'error while logging-in' });
  }
});

router.get('/oauth/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`
  );
});

router.get('/oauth/callback', (req, res) => {
  try {
    authController.oauthProcessor(req.query.code, (err, token) => {
      if (err) {
        return res.status(401).send({ err: 'bad request' });
      }
      return res.redirect(`/welcome.html?token=${token}`);
    });
  } catch (err) {
    return res
      .status(500)
      .send({ err: 'unexpected error during github login' });
  }
});

module.exports = router;
