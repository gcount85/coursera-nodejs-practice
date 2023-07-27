//import the modules that are required
const express = require('express');
const router = express.Router();
const authController = require('../aunthentication/authController');

//This method post will regiater the use
router.post('/register', (req, res) => {
  try {
    //retrive name, email and password from request body
    const userDetails = req.body;

    //calling authController registeruser method return the error msg or the result
    authController.registerUser(userDetails, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(201).send(result);
    });
  } catch (err) {
    return res.status(500).send({ error: 'unexpected error ' });
  }
});

//This method post will login the user once they are registered
router.post('/login', (req, res) => {
  try {
    //retrive email and password from req.body
    const { email, password } = req.body;

    //calling the authController login usermethod return the error or the result
    authController.loginUser({ email, password }, (err, result) => {
      if (err) {
        return res.status(401).send(err);
      }
      return res.status(200).send(result);
    });
  } catch (err) {
    return res.status(500).send({ error: 'unexpected error ' });
  }
});

module.exports = router;
