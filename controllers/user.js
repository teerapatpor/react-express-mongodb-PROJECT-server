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
      if (resultLogin === null) {
        sendSuccessResponse(res, {
          status: false,
          errMsg: "ชื่อผู้ใช้งานไม่ถูกต้อง",
        });
      } else {
        if (resultLogin.password === req.body.password) {
          const token = gebJWT({
            _id: resultLogin._id,
            username: resultLogin.username,
            firstname: resultLogin.firstname,
            lastname: resultLogin.lastname,
            avatar: resultLogin.avatar,
            role: resultLogin.role,
            chatRecieverID: resultLogin.chatRecieverID,
          });
          resultLogin["token"] = token;

          sendSuccessResponse(res, { status: true, token, resultLogin });
        } else {
          sendSuccessResponse(res, {
            status: false,
            errMsg: "รหัสผ่านไม่ถูกต้อง",
          });
        }
      }
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  register: async (req, res) => {
    try {
      const checkUsername = await userModel.findOne({
        username: req.body.username,
      });
      if (checkUsername === null) {
        await userModel.create({
          username: req.body.username,
          password: req.body.password,
          chatRecieverID: [],
        });
        sendSuccessResponse(res, { status: true });
      } else {
        sendSuccessResponse(res, { status: false });
      }
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
          firstname: req.firstname,
          lastname: req.lastname,
          avatar: req.avatar,
          chatRecieverID: req.chatRecieverID,
        };
        sendSuccessResponse(res, result);
      }
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  getUserInfo: async (req, res) => {
    try {
      console.log(req.userID);
      const result = await userModel.findOne({ _id: req.userID });
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
