const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const User = require("../models/userModel");

// {
//   asyncHandler(async (req, res, next) => {
//     res.status(200).json({ status: "success", message: " User deleted" });
//   });
// }
const renderLogin = asyncHandler(async (req, res, next) => {
  res.status(200).render("login");
});

const renderHome = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({
    user: { $in: [...req.user.friends, req.user.id] },
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "name photo",
    });

  let users = await User.find({ _id: { $ne: req.user.id } });

  users = users.filter(
    (user) =>
      !req.user.friends.includes(user.id) &&
      !req.user.friendRequests.includes(user.id)
  );
  // console.log(users);
  // console.log(req.user.friends);
  if (!posts) return new Error("No posts found");
  res.status(200).render("home", { posts, users });
});

const renderProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id)
    .populate("friends friendRequests")
    .select("-password");

  const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
  if (!profile) {
    res.status(401);
    throw new Error("There was an error getting the Profile");
  }
  console.log(profile);

  res.status(200).render("profile", { profile, posts });
});

module.exports = {
  renderLogin,
  renderHome,
  renderProfile,
};
