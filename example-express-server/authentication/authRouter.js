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
    return res.status(400).send({ error: 'error while registering a user' });
  }
});

module.exports = router;
