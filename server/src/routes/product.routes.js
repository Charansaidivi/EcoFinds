const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const localUpload = require('../middleware/localUpload');
const productController = require('../controllers/product.controller');

router.post('/', auth, localUpload.single('image'), productController.createProduct);

module.exports = router;