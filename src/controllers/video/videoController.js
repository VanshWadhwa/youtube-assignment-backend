const { Op } = require('sequelize');
const Video = require('../../db/models/Video');

const getVideos = async (req, res) => {
    const { page = 1, limit = 10, sortOrder = 'desc' } = req.query;
    const offset = (page - 1) * limit;

    try {
        const videos = await Video.findAndCountAll({
            order: [['publishedAt', sortOrder]],
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


const searchVideos = async (req, res) => {
    const { query } = req.query;

    try {
        const videos = await Video.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                ],
            },
            order: [['publishedAt', 'DESC']],
        });

        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getVideos, searchVideos };
