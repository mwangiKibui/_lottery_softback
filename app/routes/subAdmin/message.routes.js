const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/subAdmin/message.controller");
const upload = require("../../config/chat.upload.config");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // get the messages
  app.get(
    "/api/subadmin/getMessages",
    [authJwt.verifyToken, authJwt.isSubAdmin],
    controller.getMessages
  );

  app.post(
    "/api/subadmin/sendMessage",
    [authJwt.verifyToken, authJwt.isSubAdmin],
    upload.single("file"),
    controller.sendMessage
  );

  app.post(
    "/api/subadmin/broadcastMessage",
    [authJwt.verifyToken, authJwt.isSubAdmin],
    upload.single("file"),
    controller.broadcastMessage
  );

  app.patch(
    "/api/subadmin/editMessage/:messageId",
    [authJwt.verifyToken, authJwt.isSubAdmin],
    controller.editMessage
  );

  app.delete(
    "/api/subadmin/deleteMessage/:messageId",
    [authJwt.verifyToken, authJwt.isSubAdmin],
    controller.deleteMessage
  );

};