const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  brand: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
});
