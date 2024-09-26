const cron = require('node-cron');
const fetchVideosFromYouTube = require('../jobs/fetchVideosFromYouTube');

let job;

/**
 * Starts a cron job that fetches videos from YouTube every 10 seconds.
 *
 * The job will not start if it is already running.
 * @returns {void}
 */
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

/**
 * Stops the currently running cron job.
 *
 * The job will only be stopped if it is currently running.
 * @returns {void}
 */
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
