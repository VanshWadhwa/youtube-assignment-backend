/* eslint-disable no-undef */
const axios = require('axios');
const Video = require('../db/models/Video');

const apiKeyUsage = process.env.YOUTUBE_API_KEYS.split(',').map(key => ({
    key,
    lastUsed: 0,
    errorCount: 0
}));

let currentKeyIndex = 0;

const fetchVideosFromYouTube = async () => {
    const searchQuery = 'News';
    const url = (apiKey) => `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&q=${searchQuery}&key=${apiKey}`;

    const currentTime = Date.now();

    for (let i = 0; i < apiKeyUsage.length; i++) {
        const apiKeyToUse = apiKeyUsage[currentKeyIndex];

        try {
            console.log({ apiKey: apiKeyToUse.key });
            const response = await axios.get(url(apiKeyToUse.key));
            const videos = response.data.items;

            const upsertPromises = videos.map(video => ({
                title: video.snippet.title,
                description: video.snippet.description,
                publishedAt: new Date(video.snippet.publishedAt),
                thumbnailUrl: video.snippet.thumbnails.default.url,
            }));

            console.log(JSON.stringify(upsertPromises))

            await Video.bulkCreate(upsertPromises, { updateOnDuplicate: ['description', 'publishedAt', 'thumbnailUrl'] });

            apiKeyToUse.lastUsed = currentTime;
            apiKeyToUse.errorCount = 0;
            break;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error(`API key exhausted: ${apiKeyToUse.key}`);
                apiKeyToUse.errorCount += 1;
            } else {
                console.error('Error fetching videos:', error.message);
                apiKeyToUse.errorCount += 1;
            }
        }
        currentKeyIndex = (currentKeyIndex + 1) % apiKeyUsage.length;
    }
};

module.exports = fetchVideosFromYouTube;
