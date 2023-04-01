const express = require("express");
const router = express.Router({ mergeParams: true });

const authController = require("../controllers/authController");

router.get("/login", (req, res, next) => {
  res.status(200).render("login");
});

router.get("/", authController.protected, (req, res, next) => {
  res.render("base");
});
module.exports = router;
