import http from 'http';
import { todos } from './resource.js';
import { getRequestData } from './utils.js';

const PORT = process.env.PORT || 4000;
// create server - returns a server object
const server = http.createServer(async (request, response) => {
  if (request.url === '/api/v1/todos' && request.method === 'GET') {
    response.writeHead(200, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify(todos));
  } else if (request.url === '/api/v1/todos' && request.method === 'POST') {
    let reqBody = await getRequestData(request);
    todos.push(JSON.parse(reqBody)); // reqBody안의 JSON 객체의 프로퍼티는 큰 따옴표로 묶기
    response.writeHead(201, {
      'content-type': 'application/json',
    });
    response.end(reqBody);
  }
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
