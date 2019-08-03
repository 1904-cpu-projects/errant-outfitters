const router = require("express").Router();
const { User } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    console.log("single user", singleUser);
    res.status(singleUser).send(singleUser);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newItem = await User.create({ ...req.body });
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findByPk(req.params.id);
    updateUser.update({ ...req.body });
    res.send(updateUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
