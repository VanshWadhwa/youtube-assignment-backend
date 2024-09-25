const express = require('express');
const { startJob, stopJob } = require('../cron/fetchVideos');

const router = express.Router();

router.post('/start', (req, res) => {
    startJob();
    res.send('Cron job started.');
});

router.post('/stop', (req, res) => {
    stopJob();
    res.send('Cron job stopped.');
});

module.exports = router;
