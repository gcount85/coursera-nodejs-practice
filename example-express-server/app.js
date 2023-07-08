/* basic express server config */

const express = require('express');
const config = require('./config');

const app = express();

// 로깅을 위한 미들웨어
const LoggerMiddleware = (req, res, next) => {
  console.log(`Logges ${req.url} ${req.method}
	-- ${new Date()}`);
  next();
};

app.use(LoggerMiddleware); // 미들웨어를 로드하기 위해 필요

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/', (req, res) => {
  res.send('POST request will get called');
});

// 미들웨어
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section...');
  next(); // next handler를 호출함
});

// bind and listen to the connection on the host and port
app.listen(config.PORT, (err) => {
  if (err) {
    console.log('Error in server setup');
  }
  console.log('Server listening on port', config.PORT);
});
