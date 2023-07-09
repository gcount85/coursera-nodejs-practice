//import the productService
const productsService = require('./productsService');

const getProducts = (done) => {
  //call service getproducts method and pass the parameter
  productsService.getProducts(done);
};

const getProductById = (productId, done) => {
  //call service getProductById method and pass the parameter
  productsService.getProductById(productId, done);
};

const saveProductDetails = (productDetails, done) => {
  //call service saveProductDetails method and pass the parameter
  productsService.saveProductDetails(productDetails, done);
};

const deleteProductById = (productId, done) => {
  //call service deleteProductById method and pass the parameter
  productsService.deleteProductById(productId, done);
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
