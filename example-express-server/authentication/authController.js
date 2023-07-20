const userService = require('../User/UserService');
const authService = require('./authService');

function registerUser(userData, done) {
  userService.getUserByEmail(userData.email, (err, userFound) => {
    if (err) {
      done(err);
    } else {
      if (userFound) {
        done(userFound);
      } else {
        userService.registerUser(userData, done);
      }
    }
  });
}

function loginUser(userLoginDetails, done) {
  userService.getUserByEmail(userLoginDetails.email, (err, userFound) => {
    if (err) {
      return done(err);
    } else {
      const userVerified = authService.verifyUser(userLoginDetails, userFound);
      if (userVerified) {
        const jwtToken = authService.createJWT(userFound);
        return done(undefined, jwtToken);
      } else {
        return done({ error: 'User not verified' });
      }
    }
  });
}

module.exports = {
  registerUser,
  loginUser,
};
