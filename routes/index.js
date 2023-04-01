const express = require("express");
const router = express.Router();

/* GET home page. */

router.use("/users", require("../routes/usersRoutes"));
router.use("/posts", require("../routes/postsRoutes"));
router.use("/comments", require("../routes/commentsRoutes"));

module.exports = router;
