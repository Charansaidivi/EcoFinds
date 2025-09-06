const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
// Add other routes here (product, user, etc.)

module.exports = router;