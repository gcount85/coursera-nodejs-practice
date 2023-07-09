// 모든 비즈니스 로직 코드 & DAO layer 호출

const userDAO = require('./UserDAO');

const getUsers = (done) => {
  userDAO.getUsers(done);
};

const getUserById = (userId, done) => {
  userDAO.getUserById(userId, done);
};

const updateUserById = (userId, userName, done) => {
  userDAO.updateUserById(userId, userName, done);
};

module.exports = { getUsers, getUserById, updateUserById };
