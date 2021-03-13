const jwt = require("jsonwebtoken");
const { apiError, sendErrorResponse } = require("../helpers/apiResponse");

module.exports = () => (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (authorization === undefined) {
      apiError("ต้องมี Authorization header");
    }

    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret_key");
    const user = decoded.user;
    req._id = user._id;
    req.username = user.username;
    req.firstname = user.firstname;
    req.lastname = user.lastname;
    req.avatar = user.avatar;
    req.role = user.role;
    req.chatRecieverID = user.chatRecieverID;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      error.status = 401;
    }
    sendErrorResponse(res, error);
  }
};
