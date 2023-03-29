const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

/* GET users listing. */
router
  .route("/")
  .get(userController.getUsers)
  .post(authController.createNewUser);

router
  .route("/:id")
  .get(userController.getAUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
