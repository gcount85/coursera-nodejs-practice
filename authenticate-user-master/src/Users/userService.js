//import dao layer
const userDAO = require('./userDAO');

function findUser(email, done) {
  //call the userdao finduser method
  userDAO.findUser(email, done);
}

function registerUser(userData, done) {
  //call the userdao registeruser method
  userDAO.registerUser(userData, done);
}

module.exports = {
  findUser,
  registerUser,
};
