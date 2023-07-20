// all the routes. 모든 요청을 적절한 controller 함수에게 보낸다.

const express = require('express');
const routes = express.Router();

const userController = require('./UserController');

// userId를 int로 변환하는 미들웨어
const intUserId = (req, res, next) => {
  console.log(req.params);
  if (req.params.userId) {
    req.params.userId = parseInt(req.params.userId);
  }
  next();
};

/* JWT를 decoded한 값을 통해 로그인한 유저 정보 반환 */
routes.get('/me', (req, res) => {
  try {
    const userData = req.claims;
    console.log(userData);

    if (!userData.email) {
      return res.status(400).send('user email not available');
    }
    userController.getUserByEmail(userData.email, (err, result) => {
      if (err) {
        return res.status(400).send('error getting the user by email');
      }
      return res.status(200).send({ status: 'OK', data: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('unexpected error. Try after sometime');
  }
});

/* 유저 데이터를 가져오는 라우트 */
routes.get('/', (req, res) => {
  try {
    userController.getUsers((err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ status: 'OK', data: result });
    });
  } catch (err) {
    return res.status(500).send('Try after sometime', err);
  }
});

/* id로 유저 데이터를 가져오는 라우트 */
routes.get('/:userId', intUserId, (req, res) => {
  try {
    const userId = req.params.userId;
    userController.getUserById(userId, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ status: 'OK', data: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Try after sometime', err);
  }
});

/* id로 유저 데이터(유저 이름)를 변경하는 라우트 */
routes.put('/:userId', intUserId, (req, res) => {
  try {
    const { userId } = req.params;
    const { userName } = req.body;
    userController.updateUserById(userId, userName, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ status: 'OK', data: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Try after sometime', err);
  }
});

module.exports = routes;
