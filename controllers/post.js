const postModel = require("../models").post;
const userModel = require("../models").user;
const gebJWT = require("../services/genJWT");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../helpers/apiResponse");
const fs = require("fs");
module.exports = {
  createForm: async (req, res, next) => {
    try {
      console.log(req.file);
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
  updateUserInfo: async (req, res, next) => {
    try {
      var result = {};
      console.log(req.body);
      var firstname =
        req.body.newFname === "" ? req.body.oldFname : req.body.newFname;
      var lastname =
        req.body.newLname === "" ? req.body.oldLname : req.body.newLname;
      var avatar = req.avatar;
      if (req.file !== undefined) {
        const info = await userModel.findOne({ _id: req._id });
        if (info.avatar !== "" && info.avatar !== req.file.path) {
          fs.unlinkSync(info.avatar);
          avatar = req.file.path;
        } else if (info.avatar === "") {
          avatar = req.file.path;
        } else {
          avatar = info.avatar;
        }
        console.log("avatar: ", avatar);
        result = await userModel.findOneAndUpdate(
          {
            _id: req._id,
          },
          {
            $set: {
              firstname: firstname,
              lastname: lastname,
              avatar: req.file.path,
            },
          },
          { new: true }
        );
      } else {
        await userModel.updateOne(
          {
            _id: req._id,
          },
          {
            $set: {
              firstname: firstname,
              lastname: lastname,
              avatar: req.body.avatar,
            },
          }
        );
      }
      const token = gebJWT({
        _id: req._id,
        username: req.username,
        firstname: firstname,
        lastname: lastname,
        avatar: avatar,
        role: req.role,
        chatRecieverID: req.chatRecieverID,
      });
      console.log("token: ", token);
      sendSuccessResponse(res, token);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
};
