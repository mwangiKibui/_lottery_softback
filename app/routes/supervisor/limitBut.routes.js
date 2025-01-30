const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/supervisor/limitBut.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Add limit but
  app.post(
    "/api/supervisor/addLimitBut",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.addLimitBut
  );

  // Get limit all
  app.get(
    "/api/supervisor/getLimitBut",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getLimitBut
  );

  // Get limit but
  app.get(
    "/api/supervisor/getLimitButAll",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getLimitButAll
  );

   // Get limit but seller
   app.get(
    "/api/supervisor/getLimitButSeller",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getLimitButSeller
  );

  // Get limit but supervisor
  app.get(
    "/api/supervisor/getLimitButSupervisor",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getLimitButSuperVisor
  );
  
  // update limit but.
  app.patch(
    "/api/supervisor/updateLimitBut/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.updateLimitBut
  );

  // delete limit
  app.delete(
    "/api/supervisor/deleteLimitBut/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.deleteLimitBut
  );

};
