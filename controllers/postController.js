const controllerFactory = require("../controllers/controllerFactory");
const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

const getPosts = controllerFactory.getAll(Post);
const getAPost = controllerFactory.getOne(Post, { path: "comments" });
const createNewPost = controllerFactory.createOne(Post);
const updatePost = controllerFactory.updateOne(Post);
const deletePost = controllerFactory.deleteOne(Post);

const getUserPosts = asyncHandler(async (req, res, next) => {
  const docs = await Post.find({ user: req.params.id });

  if (docs.length === 0) {
    res.status(404);
    throw new Error("No documents found");
  }

  res.status(200).json({ status: "success", results: docs.length, data: docs });
});

module.exports = {
  getPosts,
  getAPost,
  createNewPost,
  updatePost,
  deletePost,
  getUserPosts,
};
