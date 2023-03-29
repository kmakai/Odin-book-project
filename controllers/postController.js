const controllerFactory = require("../controllers/controllerFactory");

const Post = require("../models/postModel");

const getPosts = controllerFactory.getAll(Post);
const getAPost = controllerFactory.getOne(Post);
const createNewPost = controllerFactory.createOne(Post);
const updatePost = controllerFactory.updateOne(Post);
const deletePost = controllerFactory.deleteOne(Post);

module.exports = {
  getPosts,
  getAPost,
  createNewPost,
  updatePost,
  deletePost,
};
