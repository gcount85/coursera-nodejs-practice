// 요청과 응답 핸들링. Service layer 호출

const userService = require('./UserService');

const getUsers = (done) => {
  userService.getUsers(done);
};

const getUserById = (userId, done) => {
  userService.getUserById(userId, done);
};

const updateUserById = (userId, userName, done) => {
  userService.updateUserById(userId, userName, done);
};

module.exports = { getUsers, getUserById, updateUserById };
