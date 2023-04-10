const asyncHandler = require("express-async-handler");
const controllerFactory = require("../controllers/controllerFactory");

const User = require("../models/userModel");

const getUsers = controllerFactory.getAll(User);
const getAUser = controllerFactory.getOne(User);

const updateUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: " User updated" });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: " User deleted" });
});

const requestFriend = asyncHandler(async (req, res, next) => {
  const requestedFriend = await User.findById(req.params.id);
  if (!requestedFriend) throw new Error("There is not such person");
  const { user } = req;

  const isFriendsOrRequested =
    requestedFriend.friends.includes(user.id) ||
    requestedFriend.friendRequests.includes(user.id);

  if (isFriendsOrRequested) {
    res.status(400);
    throw new Error("request already sent or already friends");
  }

  requestedFriend.friendRequests.push(user.id);
  await requestedFriend.save();

  res.status(200).json({
    status: "success",
    message: "Friend request successfully sent",
  });
});

const acceptFriend = asyncHandler(async (req, res, next) => {
  const requester = await User.findById(req.params.id);
  if (!requester) throw new Error("There is not such person");

  const { user } = req;

  user.friends.push(requester.id);
  user.friendRequests = user.friendRequests.filter(
    (id) => id.toString() !== requester.id.toString()
  );

  requester.friends.push(user.id);

  await user.save();
  await requester.save();

  res.status(200).json({
    status: "success",
    message: "You accepted the request",
  });
});

const rejectFriend = asyncHandler(async (req, res, next) => {
  const requester = await User.findById(req.params.id);
  if (!requester) throw new Error("There is not such person");

  const { user } = req;

  user.friendRequests = user.friendRequests.filter(
    (id) => id.toString() !== requester.id.toString()
  );

  await user.save();

  res.status(200).json({
    status: "success",
    message: "You rejected the request",
  });
});

const removeFriend = asyncHandler(async (req, res, next) => {
  const friend = await User.findById(req.params.id);
  if (!friend) throw new Error("There is not such person");

  const { user } = req;
  console.log(user);

  user.friends = user.friends.filter(
    (id) => id.toString() !== friend.id.toString()
  );
  console.log(user.friends);

  await user.save();

  res.status(201).json({
    status: "success",
    message: "You removed the friend successfully",
  });
});

module.exports = {
  getUsers,
  getAUser,
  updateUser,
  deleteUser,
  requestFriend,
  acceptFriend,
  rejectFriend,
  removeFriend,
};
