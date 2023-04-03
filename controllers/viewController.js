const asyncHandler = require("express-async-handler");

// {
//   asyncHandler(async (req, res, next) => {
//     res.status(200).json({ status: "success", message: " User deleted" });
//   });
// }
const renderLogin = asyncHandler(async (req, res, next) => {
  res.status(200).render("login");
});

const renderHome = asyncHandler(async (req, res, next) => {
  res.status(200).render("base");
});

module.exports = {
  renderLogin,
  renderHome,
};
