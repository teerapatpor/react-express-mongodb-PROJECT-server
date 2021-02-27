const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routerAPI = require("./routes.js");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv/config");
mongoose.connect(
  "mongodb+srv://admin:xQugQs8oZpNZEg8M@ownerproject.kpgm6.mongodb.net/ownerProject?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/uploads/", express.static("uploads"));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", routerAPI);

require("./middlewares/socket")(
  app,
  io,
  "mongodb+srv://admin:xQugQs8oZpNZEg8M@ownerproject.kpgm6.mongodb.net/ownerProject?retryWrites=true&w=majority"
);
// app.listen(port, () => {
//   console.log("connect on port: ", port);
// });
server.listen(8888);
