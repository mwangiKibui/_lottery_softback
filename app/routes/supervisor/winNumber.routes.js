const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/supervisor/winNumber.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Read all
  app.post(
    "/api/supervisor/getwiningnumber",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.readWinningNumber
  );
}