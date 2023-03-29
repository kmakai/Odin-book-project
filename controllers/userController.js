const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: "here are the users" });
});

const getAUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: "here is the user" });
});

const updateUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: " User updated" });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: "success", message: " User deleted" });
});

module.exports = {
  getUsers,
  getAUser,
  updateUser,
  deleteUser,
};
