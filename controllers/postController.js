const controllerFactory = require("../controllers/controllerFactory");
const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const setId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

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

const likePost = asyncHandler(async (req, res, next) => {
  let message;
  const { postId, userId } = req.body;
  const post = await Post.findById(postId);

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    message = "unliked";
  } else {
    post.likes.push(userId);
    message = "liked";
  }

  await post.save();

  res.status(200).json({ status: "success", message });
});

module.exports = {
  getPosts,
  getAPost,
  createNewPost,
  updatePost,
  deletePost,
  getUserPosts,
  setId,
  likePost,
};
