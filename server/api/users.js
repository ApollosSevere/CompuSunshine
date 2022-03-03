const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./middleware");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "first_name", "last_name", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "username"],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
