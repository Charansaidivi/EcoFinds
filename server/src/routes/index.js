const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

// Define routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrderById);
router.get('/users/:id', userController.getUserById);

// Export the router
module.exports = router;