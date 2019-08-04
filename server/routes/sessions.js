const router = require("express").Router();
const { User } = require("../db/index.js");

// get the logged in user
router.get("/login", async (req, res, next) => {
  try {
    res.send(
      await User.findOne({
        where: {
          id: req.session.userId
        }
      })
    );
  } catch (err) {
    res.send("please log in");
    next(err);
  }
});

//logout the user
router.post("/logout", (req, res, next) => {
  req.session.destroy(err => {
    console.error(err);
  });
  res.clearCookie("SID");
  res.send({});
});
module.exports = router;
