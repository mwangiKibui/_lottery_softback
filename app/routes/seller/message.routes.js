const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/seller/message.controller");
const upload = require("../../config/chat.upload.config");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // get the messages
  app.get(
    "/api/seller/getMessages",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.getMessages
  );

  app.post(
    "/api/seller/sendMessage",
    [authJwt.verifyToken, authJwt.isSeller],
    upload.single("file"),
    controller.sendMessage
  );

  app.patch(
    "/api/seller/editMessage/:messageId",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.editMessage
  );

  app.delete(
    "/api/seller/deleteMessage/:messageId",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.deleteMessage
  );

};