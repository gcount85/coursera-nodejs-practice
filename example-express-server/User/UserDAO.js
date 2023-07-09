// 데이터에 대한 모든 연산 (Data Access Object)

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

    let fetchedUser = JSON.parse(fileContent).find(
      (u, i) => u.userId === userId
    );
    if (fetchedUser === undefined) {
      return done('No user found for requested userId');
    }
    return done(undefined, fetchedUser);
  });
};

module.exports = { getUsers, getUserById };
