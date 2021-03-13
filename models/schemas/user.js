const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  chatRecieverID: [mongoose.Schema.Types.ObjectId],
});
