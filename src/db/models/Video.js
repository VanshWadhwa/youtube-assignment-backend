const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Represents a video in the database.
 *
 * @module Video
 */
const Video = sequelize.define('Video', {
    /**
     * Unique identifier for the video.
     * @type {string}
     */
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    /**
     * The title of the video.
     * @type {string}
     */
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    /**
     * A description of the video content.
     * @type {string}
     */
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    /**
     * The date the video was published.
     * @type {Date}
     */
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    /**
     * URL for the video's thumbnail image.
     * @type {string}
     */
    thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'videos',
});

module.exports = Video;
