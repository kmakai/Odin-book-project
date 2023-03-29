const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

/* GET users listing. */
router
  .route("/")
  .get(postController.getPosts)
  .post(postController.createNewPost);

router
  .route("/:id")
  .get(postController.getAPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
