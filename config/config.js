/* eslint-disable no-undef */
require('dotenv').config();

const config = {

    API_KEYS: process.env.API_KEYS ? process.env.API_KEYS.split(',') : [],
    DEFAULT_SEARCH_QUERY: process.env.DEFAULT_SEARCH_QUERY || 'News',
    CRON_SCHEDULE: process.env.CRON_SCHEDULE || '*/10 * * * * *',
};

module.exports = config;
