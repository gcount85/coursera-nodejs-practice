//import the productService
const productsService = require('./productsService');

const getProducts = (done) => {
  //call service getproducts method and pass the parameter
  productsService.getProducts(done);
};

const getProductById = (productId, done) => {
  //call service getProductById method and pass the parameter
};

const saveProductDetails = (productDetails, done) => {
  //call service saveProductDetails method and pass the parameter
};

const deleteProductById = (productId, done) => {
  //call service deleteProductById method and pass the parameter
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
