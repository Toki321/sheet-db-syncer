const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

console.log(process.env.PG_DATABASE);
console.log(process.env.PG_USER);
console.log(process.env.PG_PASSWORD);
console.log(process.env.PG_HOST);
console.log(process.env.PG_PORT);

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // added based on node-postgres defaults; you might need this
    },
  },
});

module.exports = sequelize;
