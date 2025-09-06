const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/products', require('./product.routes'));
// Add other routes here (user, etc.)

module.exports = router;