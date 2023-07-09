// all the routes. 모든 요청을 적절한 controller 함수에게 보낸다.

const express = require('express');
const routes = express.Router();

const userController = require('./UserController');

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
    return res.status(500).send('Try after sometime');
  }
});

module.exports = routes;
