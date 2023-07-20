const express = require('express');
const router = express.Router();
const authController = require('./authController');

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

module.exports = router;
