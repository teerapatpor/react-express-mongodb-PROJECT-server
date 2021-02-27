const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  name: String,
  detail: String,
  image: String,
  score: {
    type: Number,
    default: 0,
  },
  userList: [mongoose.Schema.Types.ObjectId],
  created_at: { type: Date, required: true, default: Date.now },
});
