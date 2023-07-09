// 모든 비즈니스 로직 코드 & DAO layer 호출

const userDAO = require('./UsersDAO');

const getUsers = (done) => {
  userDAO.getUsers(done);
};

module.exports = { getUsers };
