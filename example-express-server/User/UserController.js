// 요청과 응답 핸들링. Service layer 호출

const userService = require('./UserService');

const getUsers = (done) => {
  userService.getUsers(done);
};

module.exports = { getUsers };
