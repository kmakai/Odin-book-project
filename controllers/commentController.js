const asyncHandler = require("express-async-handler");
const controllerFactory = require("../controllers/controllerFactory");

const Comment = require("../models/commentModel");

const getComments = controllerFactory.getAll(Comment);
const getAComment = controllerFactory.getOne(Comment);
const createNewComment = controllerFactory.createOne(Comment);
const updateAComment = controllerFactory.updateOne(Comment);
const deleteAComment = controllerFactory.deleteOne(Comment);

const getPostComments = asyncHandler(async (req, res, next) => {
  let postId = req.params.id;
  const docs = await Comment.find({ post: postId });

  res.status(200).json({ status: "success", results: docs.length, data: docs });
});

module.exports = {
  getComments,
  getAComment,
  createNewComment,
  updateAComment,
  deleteAComment,
  getPostComments,
};
