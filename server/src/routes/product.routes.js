const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/imageUpload');
const productController = require('../controllers/product.controller');

router.post('/', auth, upload.single('image'), productController.createProduct);

module.exports = router;