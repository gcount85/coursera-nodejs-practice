// 데이터에 대한 모든 연산 (Data Access Object)

const fs = require('fs');

const getUsers = (done) => {
  fs.readFile('./users.json', (err, fileContent) => {
    if (err) {
      return done('Encountered error while getting users details');
    }

    let userData = JSON.parse(fileContent);
    return done(undefined, userData); // error, result
  });
};

module.exports = { getUsers };
