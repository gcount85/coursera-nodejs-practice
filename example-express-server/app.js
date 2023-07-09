/* basic express server config */

const express = require('express');
const config = require('./config');

const app = express();
const usersRouter = require('./User/UserRouter');

// 로깅을 위한 미들웨어 => 모든 routes 이전에 호출되어야 함
const LoggerMiddleware = (req, res, next) => {
  console.log(`Logges ${req.url} ${req.method}
	-- ${new Date()}`);
  next();
};

app.use(LoggerMiddleware); // 미들웨어를 로드하기 위해 필요
app.use(express.json()); // 요청을 JSON으로 파싱하는 내장 미들웨어(body-parser 기반)
app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/', (req, res) => {
  res.send('POST request will get called');
});

// app.use('/api/vi/users', usersRouter);

// 미들웨어
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section...');
  next(); // next handler를 호출함
});

// 에러 핸들링을 위한 미들웨어 (특정 URI가 존재하지 않을 때) => 모든 route 호출 다음에 동작
app.use((req, res, next) => {
  res.status(404).send('Error resource not found');
  next();
});

// bind and listen to the connection on the host and port
app.listen(config.PORT, (err) => {
  if (err) {
    console.log('Error in server setup');
  }
  console.log('Server listening on port', config.PORT);
});
