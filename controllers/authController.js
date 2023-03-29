const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const createNewUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({ status: "success", message: " User Created", user });
});

module.exports = {
  createNewUser,
};
