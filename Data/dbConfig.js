const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.dbEnv || 'development';

module.exports = knex(config[dbEnv]);