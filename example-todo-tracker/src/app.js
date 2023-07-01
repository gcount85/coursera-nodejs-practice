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
  } else if (
    request.url.match(/\/api\/v1\/todos\/([0-9])/) &&
    request.method === 'DELETE'
  ) {
    const id = request.url.split('/')[4];
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      response.writeHead(404, {
        'content-type': 'application/json',
      });
      response.end('No todo with the specified ID is available');
    } else {
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      response.writeHead(200, {
        'content-type': 'application/json',
      });
      response.end('Deleted the specified todo');
    }
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
