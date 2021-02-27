const postModel = require("../models").post;
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../helpers/apiResponse");
const fs = require("fs");
module.exports = {
  createForm: async (req, res, next) => {
    try {
      const formResult = await postModel.create({
        name: req.body.name,
        detail: req.body.detail,
        image: req.file.path,
      });
      sendSuccessResponse(res, formResult);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  getForm: async (req, res, next) => {
    try {
      const formResult = await postModel.find().sort({ created_at: -1 });
      sendSuccessResponse(res, formResult);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  deleteForm: async (req, res, next) => {
    try {
      const formResult = await postModel.deleteOne({ _id: req.body._id });
      fs.unlinkSync(req.body.path);
      sendSuccessResponse(res, formResult);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  likeForm: async (req, res, next) => {
    try {
      const result = await postModel.updateOne(
        { _id: req.body.postID },
        { $inc: { score: 1 }, $push: { userList: req._id } }
      );
      sendSuccessResponse(res, true);
    } catch (error) {
      sendErrorResponse(res, false);
    }
  },
  unlikeForm: async (req, res, next) => {
    try {
      const result = await postModel.updateOne(
        { _id: req.body.postID },
        { $inc: { score: -1 }, $pull: { userList: { $in: req._id } } }
      );
      sendSuccessResponse(res, true);
    } catch (error) {
      sendErrorResponse(res, false);
    }
  },
};
