/* eslint-disable no-undef */
require('dotenv').config(); // Load environment variables from a .env file

const axios = require('axios');
const Video = require('../db/models/Video');
const config = require('../../config/config')

let apiKeyUsage = config.API_KEYS.map(key => ({
    key,
    lastUsed: 0,
    errorCount: 0,
}));

let currentKeyIndex = 0;

/**
 * Fetches videos from the YouTube API based on a predefined search query.
 *
 * This function uses a round-robin method to cycle through available API keys
 * to avoid hitting the quota limits. If an API key is exhausted or encounters an error,
 * it will increment the error count and move to the next key.
 *
 * @function fetchVideosFromYouTube
 * @returns {Promise<void>}
 */
const fetchVideosFromYouTube = async (searchQuery = config.DEFAULT_SEARCH_QUERY) => {
    const url = (apiKey) => `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&q=${encodeURIComponent(searchQuery)}&key=${apiKey}`;

    const currentTime = Date.now();

    for (let i = 0; i < apiKeyUsage.length; i++) {
        const apiKeyToUse = apiKeyUsage[currentKeyIndex];

        try {
            console.log({ apiKey: apiKeyToUse.key });
            const response = await axios.get(url(apiKeyToUse.key));
            const videos = response.data.items;

            console.log({ videos: JSON.stringify(videos) });

            const upsertPromises = videos.map(video => ({
                id: video.id.videoId,
                title: video.snippet.title,
                description: video.snippet.description,
                publishedAt: new Date(video.snippet.publishedAt),
                thumbnailUrl: video.snippet.thumbnails.default.url,
            }));

            await Video.bulkCreate(upsertPromises, { updateOnDuplicate: ['description', 'publishedAt', 'thumbnailUrl'] });

            apiKeyToUse.lastUsed = currentTime;
            apiKeyToUse.errorCount = 0;
            break;
        } catch (error) {
            handleApiError(apiKeyToUse, error);
        }

        currentKeyIndex = (currentKeyIndex + 1) % apiKeyUsage.length;
    }
};

/**
 * Handles API errors, updating error counts and logging messages.
 *
 * @param {Object} apiKeyToUse - The current API key being used.
 * @param {Error} error - The error encountered.
 */
const handleApiError = (apiKeyToUse, error) => {
    if (error.response && error.response.status === 403) {
        console.error(`API key exhausted: ${apiKeyToUse.key}`);
        apiKeyToUse.errorCount += 1;
    } else {
        console.error('Error fetching videos:', error.message);
        apiKeyToUse.errorCount += 1;
    }
};

module.exports = fetchVideosFromYouTube;
