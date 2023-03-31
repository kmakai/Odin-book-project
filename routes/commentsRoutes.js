const express = require("express");
const router = express.Router({ mergeParams: true });

const commentContoller = require("../controllers/commentController");
const authController = require("../controllers/authController");

router.use(authController.protected);

router
  .route("/")
  .get(commentContoller.getComments)
  .post(commentContoller.createNewComment);

router
  .route("/:id")
  .get(commentContoller.getAComment)
  .patch(commentContoller.updateAComment)
  .delete(commentContoller.deleteAComment);

module.exports = router;
