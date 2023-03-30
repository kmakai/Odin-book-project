const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const commentContoller = require("../controllers/commentController");

router
  .route("/")
  .get(postController.getPosts)
  .post(postController.createNewPost);

router
  .route("/:id")
  .get(postController.getAPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route("/:postId/comments").get(commentContoller.getPostComments);

module.exports = router;
