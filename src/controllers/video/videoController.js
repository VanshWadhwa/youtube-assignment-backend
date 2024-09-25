const Video = require('../../db/models/Video');

const getVideos = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const videos = await Video.findAndCountAll({
            order: [['publishedAt', 'DESC']],
            limit,
            offset,
        });

        res.json({
            total: videos.count,
            pages: Math.ceil(videos.count / limit),
            videos: videos.rows,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getVideos };
