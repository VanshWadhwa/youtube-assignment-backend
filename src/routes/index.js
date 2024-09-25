const express = require('express');
const cronRoutes = require('./cronRoutes');

const router = express.Router();

router.use('/cron', cronRoutes);

module.exports = router;
