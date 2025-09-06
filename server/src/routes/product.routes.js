const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const localUpload = require('../middleware/localUpload');
const productController = require('../controllers/product.controller');

// POST /api/products
router.post('/', auth, localUpload.single('image'), productController.createProduct);

// GET /api/products
router.get('/', productController.getAllProducts);

// GET /api/products/my
router.get('/my', auth, productController.getUserListings);

// DELETE /api/products/:id
router.delete('/:id', auth, productController.deleteProduct);

// PUT /api/products/:id
router.put('/:id', auth, productController.updateProduct);

// GET /api/products/:id
router.get('/:id', auth, productController.getProductById);

module.exports = router;