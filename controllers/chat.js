const chatModel = require("../models").chat;
const userModel = require("../models").user;
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../helpers/apiResponse");
module.exports = {
  createChat: async (req, res, next) => {
    try {
      const checkChat = await chatModel.findOne({
        $or: [
          { personOne: req._id, personTwo: req.body.recieverID },
          { personOne: req.body.recieverID, personTwo: req._id },
        ],
      });
      if (checkChat === null) {
        result = await chatModel.create({
          personOne: req._id,
          personTwo: req.body.recieverID,
          history: [],
        });
        await userModel.updateOne(
          { _id: req._id },
          { $push: { chatRecieverID: req.body.recieverID } }
        );
        await userModel.updateOne(
          { _id: req.body.recieverID },
          { $push: { chatRecieverID: req._id } }
        );
      }
      sendSuccessResponse(res, true);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  chat: async (req, res, next) => {
    const message = {
      senderID: req.senderID,
      message: req.message,
      msgType: req.msgType,
    };
    try {
      const result = await chatModel.findOneAndUpdate(
        {
          $or: [
            { personOne: req.senderID, personTwo: req.recieverID },
            { personOne: req.recieverID, personTwo: req.senderID },
          ],
        },
        { $set: { recentMessage: message }, $push: { history: message } },
        { new: true }
      );
      return result.history;
    } catch (error) {
      return false;
    }
  },
  chatInfo: async (req, res, next) => {
    try {
      const findChatroom = await chatModel.findOne({
        $or: [
          { personOne: req._id, personTwo: req.body.recieverID },
          { personOne: req.body.recieverID, personTwo: req._id },
        ],
      });
      console.log(findChatroom);
      if (findChatroom === null) sendSuccessResponse(res, { history: [] });
      else sendSuccessResponse(res, findChatroom);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
};
