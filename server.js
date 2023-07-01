const http = require('http');
const PORT = process.env.PORT || 4000;
// create server - returns a server object
const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'content-type': 'text/plain',
  });
  response.end('hello!!!');
});
// make the server listen for clients
// event emitter model
// server -> emits a listen event, port number etc

server.listen(PORT, () => {
  console.log('Server is ready and listening at port', PORT);
});
server.on('error', (error) => {
  if (error.code === 'EADRINUSE') {
    console.log('Port already in use');
  }
});
