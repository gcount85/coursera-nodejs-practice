/* basic express server config */

const express = require('express');

const app = express();
const port = 9000;

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
app.listen(PORT, (err) => {
  if (err) {
    console.log('Error in server setup');
  }
  console.log('Server listening on port', PORT);
});
