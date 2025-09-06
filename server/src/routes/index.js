const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/products', require('./product.routes'));
router.use('/users', require('./user.routes'));
// Add other routes here (user, etc.)

module.exports = router;