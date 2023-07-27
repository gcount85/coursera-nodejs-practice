//import jsonwebtoken and config
const config = require('../../config');
const jwt = require('jsonwebtoken');

//This function verifyToken will verify the token coming from headers
const verifyToken = (req, res, next) => {
  try {
    // Getting the authorization header
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ err: 'token required' });
    }

    //Synchronously verify given token using a secret or a public key to get a decoded token
    const tokenDecoded = jwt.decode(token);
    req.claims = tokenDecoded;

    //return next
    return next();
  } catch (err) {
    return res
      .status(500)
      .send({ error: 'unexpected error while verifying token' });
  }
};

module.exports = verifyToken;
