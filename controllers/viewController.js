const asyncHandler = require("express-async-handler");
const { generateToken } = require("../controllers/authController");

const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

// {
//   asyncHandler(async (req, res, next) => {
//     res.status(200).json({ status: "success", message: " User deleted" });
//   });
// }
const renderLogin = asyncHandler(async (req, res, next) => {
  res.status(200).render("login");
});

const renderRegister = asyncHandler(async (req, res, next) => {
  res.status(200).render("register", { title: "Registration" });
});

const renderHome = asyncHandler(async (req, res, next) => {
  let posts = await Post.find({
    user: { $in: [...req.user.friends, req.user.id] },
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "name photo",
    });
  const postIds = posts.map((p) => p.id);
  const comments = await Comment.find({ post: { $in: postIds } });

  posts = posts.map((p) => {
    p.comments = comments.filter((c) => c.post.toString() === p.id.toString());
    return p;
  });

  let users = await User.find({ _id: { $ne: req.user.id } });

  users = users.filter(
    (user) =>
      !req.user.friends.includes(user.id) &&
      !req.user.friendRequests.includes(user.id) &&
      !user.friendRequests.includes(req.user.id)
  );
  // console.log(users);
  // console.log(req.user.friends);
  if (!posts) return new Error("No posts found");
  res.status(200).render("home", { posts, users });
});

const renderProfile = asyncHandler(async (req, res, next) => {
  let id = req.params.userId ? req.params.userId : req.user.id;
  console.log(req.params);
  const profile = await User.findById(id)
    .populate("friends friendRequests")
    .select("-password");

  let posts = await Post.find({ user: id }).sort({ createdAt: -1 }).populate({
    path: "user",
    select: "name photo",
  });
  if (!profile) {
    res.status(401);
    throw new Error("There was an error getting the Profile");
  }

  const postIds = posts.map((p) => p.id);
  const comments = await Comment.find({ post: { $in: postIds } });

  posts = posts.map((p) => {
    p.comments = comments.filter((c) => c.post.toString() === p.id.toString());
    return p;
  });

  let render;
  if (req.params.userId) render = "userProfile";
  else render = "profile";
  console.log(render);
  res.status(200).render(render, {
    profile,
    posts,
  });
});

module.exports = {
  renderLogin,
  renderHome,
  renderProfile,
  renderRegister,
};
