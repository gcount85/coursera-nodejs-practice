getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    try {
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
    // Write logic to read the request body data here
  });
};

module.exports = getRequestData;
