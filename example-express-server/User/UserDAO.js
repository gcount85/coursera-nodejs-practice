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

module.exports = { getUsers };
