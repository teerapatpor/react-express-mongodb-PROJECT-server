const chatController = require("../controllers/chat");
const userController = require("../controllers/user");
const user = {};
module.exports = (app, io, db) => {
  io.on("connection", function (socket) {
    socket.on("user_login", async (data) => {
      const userInfo = await userController.getUserInfo({ userID: data.id });
      user[`${socket.id}`] = {
        userID: data.id,
        socketID: socket.id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        avatar: userInfo.avatar,
      };

      // var check = true;
      // user.map((value) => {
      //   if (value.userID === data.id) check = false;
      // });
      // if (check) {
      //   user.push({
      //     userID: data.id,
      //     socketID: socket.id,
      //     username: data.username,
      //   });
      console.log(user);
      socket.emit("user_socketID", socket.id);
      socket.broadcast.emit("chat_list", user);
    });
    // socket.broadcast.emit("chat_list", user);
    socket.on("user_logout", (id) => {
      delete user[id];
      console.log(user);
      socket.broadcast.emit("chat_list", user);
    });

    socket.on("fetch_chat", async (value) => {
      await socket.emit("chat_list", user);
    });
    //console.log("sid", socket.id);
    socket.on("message", async (data) => {
      await chatController.chat(data);
      const result = {
        message: data.message,
        senderID: data.senderID,
      };
      socket.broadcast.emit("recieve_message", result);
    });
    socket.on("chat", async (data) => {
      const history = await chatController.chat(data);
      socket.broadcast.emit("recieve_message", data);
      socket.to[data.socketReciever].emit("recieve_message", data);
    });
    // socket.on("user_list", (data) => {
    //   socket.emit("chat_list", user);
    // });
    socket.on("disconnect", () => {
      //user = user.filter((users) => users.socketID !== socket.id);
      delete user[socket.id];
      console.log("Client ", socket.id, " disconnected");
    });
  });
};
