const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/supervisor/percentageLimit.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Add percentage limit
  app.post(
    "/api/supervisor/addPercentageLimitBut",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.addPercentageLimitBut
  );

  app.get(
    "/api/supervisor/getPercentageLimitButAll",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getPercentageLimitButAll
  );

  app.get(
    "/api/supervisor/getPercentageLimitBut",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getPercentageLimitBut
  );

  app.get(
    "/api/supervisor/getPercentageLimitButSeller",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getPercentageLimitButSeller
  );

  app.get(
    "/api/supervisor/getPercentageLimitButSuperVisor",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getPercentageLimitButSuperVisor
  );

  app.patch(
    "/api/supervisor/updatePercentageLimitBut/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.updatePercentageLimitBut
  );

  app.delete(
    "/api/supervisor/deletePercentageLimitBut/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.deletePercentageLimitBut
  );

};