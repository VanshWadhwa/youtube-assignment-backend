const express = require('express');
const cronRoutes = require('./cronRoutes');
const videoRoutes = require('./videoRoutes');

const router = express.Router();

router.use('/cron', cronRoutes);
router.use('/video', videoRoutes);

module.exports = router;
