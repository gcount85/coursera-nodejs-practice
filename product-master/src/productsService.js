// Import the necessary dependencies
const lodash = require('lodash');
const productsList = require('./products.json').products;

const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
};

const getProductsById = (productId, done) => {
  let product = null;

  // get a product by ID
  product = productsList.find((p) => p.id === productId);
  if (!product) {
    return done("Requested product doesn't exist..!", null);
  } else {
    return done(null, JSON.stringify(product));
  }
};

const saveProduct = (newProduct, done) => {
  // save a product
  let exists = productsList.some((obj) => obj.id === newProduct.id);

  if (exists) {
    return done('Product already exists..!', null);
  } else {
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
  }
};

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  // update the product list
  let productIndex = productsList.findIndex((p) => p.id === productId);

  if (productIndex == -1) {
    done("Requested product doesn't exist..!", null);
  } else {
    updateData['id'] = productId;
    productsList[productIndex] = updateData;
    updatedProductList = productsList;
    done(null, JSON.stringify(updatedProductList));
  }
};

const deleteProduct = (productId, done) => {
  // delete a product
  let productIndex = productsList.findIndex((p) => p.id === productId);
  if (productIndex == -1) {
    done("Requested product doesn't exist..!", null);
  } else {
    productsList.splice(productIndex, 1);
    done(null, JSON.stringify(productsList));
  }
};

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
