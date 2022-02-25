const router = require("express").Router();
const {
  models: { Product, Review, User },
} = require("../db");
const { isAdmin, requireToken } = require("./middleware");
module.exports = router;

// Path is /api/products (GET)
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
      include: {
        model: Review,
      },
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Path is /api/products/:productId (GET)
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: { model: Review, include: { model: User } },
    });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

router.post("/review", async (req, res, next) => {
  try {
    const review = req.body;
    await Review.create(review);

    const updatedProduct = await Product.findByPk(review.productId, {
      include: { model: Review, include: { model: User } },
    });

    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.put("/checkInventory/:productId", async (req, res, next) => {
  try {
    let canPurchase = false;
    const { cartItemAmount } = req.body;
    const productToCheck = await Product.findByPk(req.params.productId);

    if (productToCheck.quantity >= cartItemAmount) {
      canPurchase = true;
    }
    res.send(canPurchase);
  } catch (error) {
    next(error);
  }
});

router.put("/:productId", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.productId);
    const updateProduct = await productToUpdate.update(req.body);
    res.send(updateProduct);
  } catch (error) {
    next(error);
  }
});

router.put("/updatecount/:productId", async (req, res, next) => {
  try {
    const { cartItemAmount } = req.body;

    const productToUpdate = await Product.findByPk(req.params.productId);
    const oldAmount = productToUpdate.quantity;

    const updateProduct = await productToUpdate.update({
      quantity: oldAmount - cartItemAmount,
    });
    res.send(updateProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.productId);
    await productToDelete.destroy();
    res.send(productToDelete);
  } catch (error) {
    next(error);
  }
});
