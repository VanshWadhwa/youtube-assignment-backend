const cron = require('node-cron');
const fetchVideosFromYouTube = require('../jobs/fetchVideosFromYouTube');

let job;

const startJob = () => {
    if (!job) {
        job = cron.schedule('*/10 * * * * *', async () => {
            await fetchVideosFromYouTube();
        });
        console.log('Cron job started.');
    } else {
        console.log('Cron job is already running.');
    }
};

const stopJob = () => {
    if (job) {
        job.stop();
        job = null;
        console.log('Cron job stopped.');
    } else {
        console.log('No cron job is currently running.');
    }
};

module.exports = { startJob, stopJob };
