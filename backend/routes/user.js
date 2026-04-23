const middlewareController = require('../controllers/middlewareController.js');
const userControllers = require('../controllers/userControllers');

const route = require('express').Router();

//get all users
route.get('/', middlewareController.verifyTokenAndAdminAuth, userControllers.getAllUsers);

//delete user
route.delete('/:id', middlewareController.verifyTokenAndAdminAuth, userControllers.deleteUser);

//update user from admin
route.put('/update-listusers/:id', userControllers.updateListUser);

//create product
route.post('/create-product', userControllers.createProduct);

//get all products
route.get('/all-products', userControllers.getAllProducts);

//delete product
route.delete('/delete-product/:id', middlewareController.verifyTokenAndAdminAuth, userControllers.deleteProduct);

//update Product
route.put('/update-product/:id', userControllers.updateProduct);

//add product to cart
route.post('/add-to-cart', userControllers.createCart);

//add product to cart
route.get('/get-all-cart', userControllers.getAllCarts);

//delete product from carts
route.delete('/delete-cart/:id', userControllers.deleteProductCarts);

//create new Order
route.post('/create-order', userControllers.createNewOrder);

//get all order
route.get('/all-orders', userControllers.getAllOders);

//update order
route.put('/update-order/:id', userControllers.updateOrders);

//delete order
route.delete('/delete-order/:id', userControllers.deleteOrder);

module.exports = route;
