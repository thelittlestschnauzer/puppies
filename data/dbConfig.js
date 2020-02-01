const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'deelopment';

module.exports = knex(config[dbEnv]);

