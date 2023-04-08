const asyncHandler = require("express-async-handler");
const { promisify } = require("util");
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

  let token = generateToken(user._id);
  res.cookie("jwt", token);

  res.status(201).json({
    status: "success",
    message: " User Created",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.cookie("jwt", token);
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const loginGuest = asyncHandler(async (req, res, next) => {
  const guestLogins = [
    "Lue73@hotmail.com",
    "Selina56@yahoo.com",
    "Isaac_Auer1@gmail.com",
    "Laurel30@gmail.com",
    "Jerrold49@hotmail.com",
    "Duncan24@yahoo.com",
    "Ebony.Oberbrunner42@hotmail.com",
    "Corrine_Witting98@yahoo.com",
    "Jenifer.Christiansen@hotmail.com",
    "Joannie_Nicolas37@hotmail.com",
  ];

  const randomN = Math.floor(Math.random() * (9 - 0 + 1) + 0);
  console.log(randomN);

  req.body.email = guestLogins[randomN];
  req.body.password = "pass1234";
  next();
});

const logOutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: "success" });
});

const protected = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers; // deconstruct authorization from request.
  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // get token from authoriztion header
      token = authorization.split(" ")[1];

      // Verify the token
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // get user with token.
      const user = await User.findById(decodedToken.id);

      if (user) {
        req.user = user;
        res.locals.user = user;
      }

      // pass to protected middleware
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Must login to access");
    }
  } else if (req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      const user = await User.findById(decodedToken.id);
      if (user) {
        req.user = user;
        res.locals.user = user;
      }

      next();
    } catch (error) {
      console.log(err);
      res.status(401);
      throw new Error("Must login to access");
    }
  } else {
    if (req.originalUrl === "/") return res.redirect("/login");
  }

  // refuse access if no token
  if (!token) {
    res.status(401);
    throw new Error("Must login to access");
  }
});

/////////////////////////////// PASSPORT FACEBOOK AUTH
const passport = require("passport");
const facebookStrategy = require("passport-facebook");
const { token } = require("morgan");

module.exports = {
  createNewUser,
  loginUser,
  logOutUser,
  protected,
  generateToken,
  loginGuest,
};
