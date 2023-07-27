//Import the necessary dependencies
const http = require('http');
// Define a prot at which the server will run
const PORT = 4000;

const productsService = require('./productsService');
const getRequestData = require('./utils');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/v1/products' && req.method === 'GET') {
    // Get all products
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(productsService.getProducts());
  } else if (
    req.url.match(/\/api\/v1\/products\/([0-9])/) &&
    req.method === 'GET'
  ) {
    // Get a product with specified id
    const id = parseInt(req.url.split('/')[4]);
    productsService.getProductsById(id, (err, result) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(result);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  } else if (req.url === '/api/v1/products' && req.method === 'POST') {
    // Create a new product
    let reqBody = await getRequestData(req);
    productsService.saveProduct(JSON.parse(reqBody), (err, result) => {
      if (err) {
        res.writeHead(409, { 'content-type': 'application/json' }); // when conflicted
        res.end(result);
      } else {
        res.writeHead(201, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  } else if (
    req.url.match(/\/api\/v1\/products\/([0-9])/) &&
    req.method === 'PUT'
  ) {
    // Update a specific product
    let reqBody = await getRequestData(req);
    const id = parseInt(req.url.split('/')[4]);
    productsService.updateProduct(id, JSON.parse(reqBody), (err, result) => {
      if (err) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(result);
      } else {
        res.writeHead(201, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  } else if (
    req.url.match(/\/api\/v1\/products\/([0-9])/) &&
    req.method === 'DELETE'
  ) {
    // Delete a specific Product
    const id = parseInt(req.url.split('/')[4]);
    productsService.deleteProduct(id, (err, result) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(result);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(result);
      }
    });
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
