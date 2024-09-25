/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const config = require('../config/config');
require('dotenv').config();


const env = process.env.NODE_ENV || 'dev';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

module.exports = { sequelize };
