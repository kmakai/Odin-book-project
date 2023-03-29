const controllerFactory = require("../controllers/controllerFactory");

const Comment = require("../models/commentModel");

const getComments = controllerFactory.getAll(Comment);
const getAComment = controllerFactory.getOne(Comment);
const createNewComment = controllerFactory.createOne(Comment);
const updateAComment = controllerFactory.updateOne(Comment);
const deleteAComment = controllerFactory.deleteOne(Comment);

module.exports = {
  getComments,
  getAComment,
  createNewComment,
  updateAComment,
  deleteAComment,
};
