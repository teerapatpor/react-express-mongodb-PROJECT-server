const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  chatRecieverID: [mongoose.Schema.Types.ObjectId],
});
