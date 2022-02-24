const router = require("express").Router();
const {
  models: { Product, Order, OrderItem },
} = require("../db");
module.exports = router;

// Path is /api/cart/ (GET)
router.get("/:userId", async (req, res, next) => {
  /* Grab all the items that belong to user */
  try {
    const loggedInUser = req.params.userId;

    const user_Order = await Order.findOne({
      where: {
        userId: loggedInUser,
        status: "pending",
      },
    });

    const products =
      user_Order &&
      (await OrderItem.findAll({
        where: {
          orderId: user_Order.id,
        },
      }));

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Path is /api/cart/:cartItem (PUT) UPDATE CART
router.put("/:cartItem", async (req, res, next) => {
  try {
    const { task: operation } = req.body;
    const cartItem = await OrderItem.findByPk(req.params.cartItem);
    const prevQuantity = cartItem.quantity;

    if (operation === "add") {
      await cartItem.update({ quantity: prevQuantity + 1 });
    }
    if (operation === "subtract") {
      prevQuantity > 1 &&
        (await cartItem.update({ quantity: prevQuantity - 1 }));
    }
    if (operation === "remove") {
      await cartItem.destroy();
    }

    res.status(200).json(cartItem);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, productId, loggedInUser, price, productObj } = req.body;

    const [order, createdOrder] = await Order.findOrCreate({
      where: { userId: loggedInUser, status: "pending" },
      defaults: {
        status: "pending",
      },
    });

    const [orderItem, createdOrderItem] = await OrderItem.findOrCreate({
      where: { orderId: order.id, productId, status: "pending" },
      defaults: {
        name,
        status: "pending",
        price,
        productId,
        imageUrl: productObj.imageUrl,
        orderId: order.id,
        quantity: 1,
        addedFromGuestCart: false,
      },
    });

    const prevQuantity = orderItem.quantity;
    !createdOrderItem && orderItem.update({ quantity: prevQuantity + 1 });

    const product = await Product.findByPk(productId);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Path is /api/products/:orderInfo (POST)
router.post("/addFromGuestUserCart", async (req, res, next) => {
  try {
    const { productId, loggedInUser, price, productObj } = req.body;

    const [order, createdOrder] = await Order.findOrCreate({
      where: { userId: loggedInUser, status: "pending" },
      defaults: {
        status: "pending",
      },
    });

    // const [newOrder, created] = await Order.findOrCreate({
    //   where: { userId: loggedInUser and status: "fullfilled" },  <-- (user will be able to see pass orders in the future!)
    //   defaults: {
    //     status: "pending",
    //   },
    // });    (Apollos Need this for testing purposes) This will be useful when a customer has submited their entire order, they will need a whole new cart/order to purchase new things!

    const [orderItem, createdOrderItem] = await OrderItem.findOrCreate({
      where: {
        orderId: order.id,
        productId,
        status: "pending",
      },
      defaults: {
        status: "pending",
        price,
        productId,
        imageUrl: productObj.imageUrl,
        orderId: order.id,
        quantity: productObj.quantity,
        addedFromGuestCart: false,
      },
    });

    let resposne;
    if (createdOrderItem) {
      resposne = await orderItem.update({ quantity: productObj.quantity });
    } else {
      if (!orderItem.addedFromGuestCart) {
        resposne = await orderItem.update({ quantity: productObj.quantity });
      }
    }

    await orderItem.update({ addedFromGuestCart: true });
    // const product = await Product.findByPk(resposne);

    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
});
