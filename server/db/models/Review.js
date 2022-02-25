const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("review", {
  rating: {
    type: Sequelize.INTEGER,
  },
  comment: {
    type: Sequelize.TEXT,
  },
});
