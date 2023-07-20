const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
  // getting the authorization header
  const token = req.headers['authorization'];

  // token coming in headers
  if (!token) {
    return res.status(403).send('A token in required for authentication');
  }

  // synchronously verify given token using a secret or a public key to get a decoded token
  try {
    const decoded = jwt.verify(token, config.AUTH_SECRET);
    req.claims = decoded; // claim은 request의 custom key이다.
  } catch (err) {
    return res.status(401).send('invalid token');
  }
  return next();
};

module.exports = { verifyToken };
