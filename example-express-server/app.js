/* basic express server config */

const express = require('express');

const app = express();
const port = 9000;

// bind and listen to the connection on the host and port
app.listen(PORT, (err) => {
  if (err) {
    console.log('Error in server setup');
  }
  console.log('Server listening on port', PORT);
});
