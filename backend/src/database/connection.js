const Sequelize = require('sequelize');

const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;
const port = process.env.SQLPORT;

const connection = new Sequelize(database, username, '',{
    host,
    dialect,
});

module.exports = connection;