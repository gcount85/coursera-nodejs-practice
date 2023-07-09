//import fs module
const fs = require('fs');

//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function (done) {
  //parse the filecontent and save it in another varible say productdata
  //return the callback with first parameter as undefined and second parameter as productdata
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      console.log(err);
      return done('an error ocurred', err);
    }
    const productData = JSON.parse(fileContent);
    return done(undefined, productData);
  });
};

//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function (productId, done) {
  //write all the logical steps
  //return the callback with first parameter as undefined and second parameter as productDetails
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      console.log(err);
      return done('an error ocurred', err);
    }
    const productData = JSON.parse(fileContent);
    const product = productData.find((p) => p.id === productId);
    if (!product) {
      return done("can't find", err);
    }
    return done(undefined, product);
  });
};

//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData
  //Write the productData into the file
  //return the callback with undefined and ProductDetails
};

//The method deleteProductById will take productId and done as parameters
//It will read the product.json file

const deleteProductById = function (productId, done) {
  //Write all the logical steps
  //return the callback with first parameter as undefined and second parameter as productDetails
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
