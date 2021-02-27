const mongoose = require("mongoose");
const schema = require("./schemas");

module.exports = {
  post: mongoose.model("posts", schema.postSchema),
  user: mongoose.model("users", schema.userSchema),
  chat: mongoose.model("chats", schema.chatSchema),
};
