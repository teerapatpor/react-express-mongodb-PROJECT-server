const userModel = require("../models").user;
const gebJWT = require("../services/genJWT");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../helpers/apiResponse");
module.exports = {
  login: async (req, res) => {
    try {
      const resultLogin = await userModel.findOne({
        username: req.body.username,
      });
      const token = gebJWT({
        _id: resultLogin._id,
        username: resultLogin.username,
        role: resultLogin.role,
        chatRecieverID: resultLogin.chatRecieverID,
      });
      resultLogin["token"] = token;
      sendSuccessResponse(res, { token, resultLogin });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  register: async (req, res) => {
    try {
      const resultRegister = await userModel.create({
        username: req.body.username,
        password: req.body.password,
        chatRecieverID: [],
      });
      sendSuccessResponse(res, true);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  tokenCheck: async (req, res) => {
    try {
      if (req._id !== null && req._id !== undefined) {
        const result = {
          _id: req._id,
          username: req.username,
          role: req.role,
          chatRecieverID: req.chatRecieverID,
        };
        sendSuccessResponse(res, result);
      }
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
};
