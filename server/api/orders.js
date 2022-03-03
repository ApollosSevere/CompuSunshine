const router = require("express").Router();
const {
  models: { Order, OrderItem, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: "pending",
      },
      include: [{ model: OrderItem }],
    });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/pastOrders", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: "fullfilled",
      },
      include: [{ model: OrderItem }, { model: Product }],
    });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId", async (req, res, next) => {
  try {
    const [order, orderCreated] = await Order.findOrCreate({
      where: {
        id: req.params.orderId,
      },
      defaults: {
        status: "pending",
      },
    });
    await order.update(req.body);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});
