const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
require('dotenv').config(); // Load environment variables from .env file

const {
  NODE_ENV,
  DB_DIALECT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
} = process.env;

console.log('Environment Variables1:', process.env);

const sequelize = new Sequelize({
  "dialect": DB_DIALECT,
  "username": DB_USERNAME,
  "password": DB_PASSWORD,
  "database": DB_DATABASE,
  "host": DB_HOST,
} || config.development);

async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connection();

module.exports = sequelize;
