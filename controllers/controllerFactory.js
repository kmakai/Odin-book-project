const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404);
      throw new Error("That id is invalid");
    }
    console.log(req.params.id);

    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      res.status(404);
      throw new Error("No document found");
    }

    res.status(200).json({ status: "success", data: doc });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    req.body.user && "6424adf4dd7744621169eddc";
    const doc = await Model.create(req.body);
    res
      .status(200)
      .json({ status: "success", message: "Post Created", data: doc });
  });

const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.find();

    if (docs.length === 0) {
      res.status(404);
      throw new Error("No documents found");
    }

    res
      .status(200)
      .json({ status: "success", results: docs.length, data: docs });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      res.status(404);
      throw new Error("No document found");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(404);
      throw new Error("No document found");
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

module.exports = {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
