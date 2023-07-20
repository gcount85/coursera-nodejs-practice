// 데이터에 대한 모든 연산 (Data Access Object)

const users = require('./users.json');
const fs = require('fs');

/* 
json 파일을 읽고 데이터 불러오기

*/
const getUsers = (done) => {
  fs.readFile('User/Users.json', (err, fileContent) => {
    if (err) {
      console.log(err);
      return done('Encountered error while getting users details');
    }

    let userData = JSON.parse(fileContent);
    return done(undefined, userData); // error, result
  });
};

const getUserById = (userId, done) => {
  fs.readFile('User/Users.json', (err, fileContent) => {
    if (err) {
      console.log(err);
      return done('Encounterd error while getting user details by its id');
    }

    let userData = JSON.parse(fileContent);
    let fetchedUser = userData.find((u, i) => u.userId === userId);
    if (fetchedUser === undefined) {
      return done('No user found for requested userId');
    }
    return done(undefined, fetchedUser);
  });
};

const getUserByEmail = (email, done) => {
  const userFetched = users.filter((u) => u.email === email)[0];
  return done(undefined, userFetched);
};

const updateUserById = (userId, userName, done) => {
  fs.readFile('User/Users.json', (err, fileContent) => {
    if (err) {
      console.log(err);
      return done('Encounterd error while getting user details by its id');
    }

    let userData = JSON.parse(fileContent);
    let userIdx = userData.findIndex((u, i) => u.userId === userId);
    if (userIdx == -1) {
      return done('No user found for requested userId');
    }
    userData[userIdx].userName = userName;
    fs.writeFile('User/Users.json', JSON.stringify(userData), (err) => {
      if (err) {
        return done('Encounterd error while getting user details by its id');
      }
      return done(undefined, 'successfully updated user details');
    });
  });
};

const registerUser = (userData, done) => {
  users.push(userData);
  fs.writeFile('User/Users.json', JSON.stringify(users), (err) => {
    if (err) {
      return done('Encounterd error while registering user');
    }
    return done(undefined, 'successfully registered user');
  });
};

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  getUserByEmail,
  registerUser,
};
