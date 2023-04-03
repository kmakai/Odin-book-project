const express = require("express");
const router = express.Router({ mergeParams: true });

const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

router.get("/login", viewController.renderLogin);
router.get("/", authController.protected, viewController.renderHome);

module.exports = router;
