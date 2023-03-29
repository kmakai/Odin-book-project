var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello from the api");
});

router.use("/users", require("../routes/usersRoutes"));
router.use("/posts", require("../routes/postsRoutes"));

module.exports = router;
