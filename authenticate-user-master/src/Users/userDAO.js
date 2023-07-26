//import users.json file and fs module
const users = require('./users.json');
const fs = require('fs');

//This method will findUser
function findUser(email, done) {
  //use filter method to find the user from json file
  try {
    const userFound = users.filter((u) => u.email === email);
    if (!userFound) {
      return done('user not found');
    }
    return done(undefined, userFound[0]);
  } catch (err) {
    return done('unexpected error while finding user');
  }
}

//This method will register user
function registerUser(userData, done) {
  //call fileWrite method and write the user in json file
  try {
    users.push(userData);
    fs.writeFileSync('./users.json', JSON.stringify(users));
    return done(undefined, 'successfully registered');
  } catch (err) {
    return done('unexpected error while registering user');
  }
}

module.exports = {
  findUser,
  registerUser,
};
