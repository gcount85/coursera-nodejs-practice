//import the required module
const express = require('express');
const router = express.Router();
const userController = require('./userController');

//This get method will get the user with token
router.get('/', (req, res) => {
  //retrive userdata from req claims
  try {
    const userdata = req.claims;

    //Calling controller findUser method return the error or result
    userController.findUser(userdata.email, (err, result) => {
      if (err) {
        return res.status(401).send({ err: 'error while finding user ' });
      }
      return res.status(200).send({ data: result });
    });
  } catch (err) {
    return res.status(500).send({ err: 'unexpected error while finding user' });
  }
});

module.exports = router;
