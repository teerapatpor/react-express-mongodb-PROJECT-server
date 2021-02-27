const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  personOne: mongoose.Schema.Types.ObjectId,
  personTwo: mongoose.Schema.Types.ObjectId,
  recentMessage: {
    _id: false,
    senderID: mongoose.Schema.Types.ObjectId,
    message: String,
    msgType: String,
  },
  history: [
    {
      _id: false,
      senderID: mongoose.Schema.Types.ObjectId,
      message: String,
      msgType: String,
    },
  ],
});
