const { Op } = require('sequelize');
const Video = require('../../db/models/Video');

/**
 * Retrieves a paginated list of videos, sorted by publication date.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {number} [req.query.page=1] - The page number to retrieve.
 * @param {number} [req.query.limit=10] - The number of videos per page.
 * @param {string} [req.query.sortOrder='desc'] - The order in which to sort the videos ('asc' or 'desc').
 * @returns {void}
 */
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

/**
 * Searches for videos by title or description using a query string.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.query.query - The search query to use for finding videos.
 * @returns {void}
 */
const searchVideos = async (req, res) => {
    const { query } = req.query;

    try {
        const videos = await Video.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                    { title: { [Op.iLike]: `%${query.split(' ').join('%')}%` } }
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
