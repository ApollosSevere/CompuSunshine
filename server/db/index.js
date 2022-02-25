//this is the access point for all things database related!
const Order = require("./models/Orders");
const OrderItem = require("./models/OrderItems");
const Product = require("./models/Products");
const User = require("./models/User");
const Review = require("./models/Review");

const db = require("./db");

//associations could go here!

/*------- Relationship Between Orders and User -------*/
Order.belongsTo(User);
User.hasMany(Order);

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });
Order.hasMany(OrderItem);

User.hasMany(Review, {
  foreignKey: "commenter_Id",
});
Review.belongsTo(User, {
  foreignKey: "commenter_Id",
});

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderItem,
    Order,
    Review,
  },
};
