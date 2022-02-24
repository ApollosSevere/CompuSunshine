const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("orderitem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  quantity: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM,
    values: ["pending", "purchased"],
  },
  price: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  addedFromGuestCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
