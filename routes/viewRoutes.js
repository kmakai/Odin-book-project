const express = require("express");
const router = express.Router({ mergeParams: true });

const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

router.get("/login", viewController.renderLogin);
router.get("/register", viewController.renderRegister);
router.get("/", authController.protected, viewController.renderHome);
router.get(
  "/my-profile",
  authController.protected,
  viewController.renderProfile
);
router.get(
  "/:userId/profile",
  authController.protected,
  viewController.renderProfile
);

module.exports = router;
