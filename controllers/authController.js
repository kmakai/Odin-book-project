const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const createNewUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: " User Created",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const protected = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers; // deconstruct authorization from request.

  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // get token from authoriztion header
      token = authorization.split(" ")[1];

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // get user with token.
      req.user = await User.findById(decodedToken.id);

      // pass to protected middleware
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  // refuse access if no token
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

/////////////////////////////// PASSPORT FACEBOOK AUTH
const passport = require("passport");
const facebookStrategy = require("passport-facebook");

module.exports = {
  createNewUser,
  loginUser,
  protected,
};
