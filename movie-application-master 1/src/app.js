// Import the required dependencies
const http = require('http');
const moviesService = require('./moviesService');
const getRequestData = require('./utils');

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if (req.url === '/movies' && req.method === 'GET') {
    moviesService.getMovies((err, result) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(err);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  } else if (req.url.match(/\/movies\/([0-9])/) && req.method === 'GET') {
    // Get a movie with specified id
    const movieId = parseInt(req.url.split('/')[2]);
    moviesService.getMoviesById(movieId, (err, result) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(err);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  } else if (req.url === '/movies' && req.method === 'POST') {
    // Save movie details
    const reqBody = JSON.parse(await getRequestData(req));
    moviesService.saveMovie(reqBody, (err, result) => {
      if (err) {
        res.writeHead(409, { 'content-type': 'application/json' });
        res.end(err);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  } else if (req.url.match(/\/movies\/([0-9])/) && req.method === 'PUT') {
    // Update a specific movie
    const movieId = parseInt(req.url.split('/')[2]);
    const reqBody = JSON.parse(await getRequestData(req));
    moviesService.updateMovie(movieId, reqBody, (err, result) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(err);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  } else if (req.url.match(/\/movies\/([0-9])/) && req.method === 'DELETE') {
    // Delete a specific movie
    const movieId = parseInt(req.url.split('/')[2]);
    moviesService.deleteMovieById(movieId, (err, result) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(err);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  }
  // If no route present capture in the else part
  else {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end('not found');
  }
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on('error', (error) => {
  if (error.code === 'EADRINUSE') {
    console.log('Port already in use');
  }
});
