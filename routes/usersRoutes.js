const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router.post("/register", authController.createNewUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logOutUser);

router.use(authController.protected);

router.route("/").get(userController.getUsers);

router
  .route("/:id")
  .get(userController.getAUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.get("/:id/posts", postController.getUserPosts);

// friendship rountes
router.patch("/:id/request-friend", userController.requestFriend);
router.patch("/:id/accept-friend", userController.acceptFriend);
router.patch("/:id/reject-friend", userController.rejectFriend);
router.patch("/:id/remove-friend", userController.removeFriend);

module.exports = router;
