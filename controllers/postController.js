const asyncHandler = require("express-async-handler");
const controllerFactory = require("../controllers/controllerFactory");

const Post = require("../models/postModel");

const getPosts1 = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: "here are the Posts" });
});

const getPosts = controllerFactory.getAll(Post);
const getAPost = controllerFactory.getOne(Post);
const createNewPost = controllerFactory.createOne(Post);
const updatePost = controllerFactory.updateOne(Post);
const deletePost = controllerFactory.deleteOne(Post);

module.exports = {
  getPosts,
  getPosts1,
  getAPost,
  createNewPost,
  updatePost,
  deletePost,
};
