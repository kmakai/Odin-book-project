const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const commentContoller = require("../controllers/commentController");
const authController = require("../controllers/authController");

router.use(authController.protected);

router
  .route("/")
  .get(postController.getPosts)
  .post(postController.createNewPost);

router
  .route("/:id")
  .get(postController.getAPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route("/:id/comments").get(commentContoller.getPostComments);

module.exports = router;
