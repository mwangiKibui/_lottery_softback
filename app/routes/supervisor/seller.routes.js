const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/supervisor/seller.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // add seller
  app.post(
    "/api/supervisor/addSeller",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.addseller
  );


  app.get(
    "/api/supervisor/getSeller",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getseller
  );

  app.patch(
    "/api/supervisor/updateSeller/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.updateseller
  );

  app.patch(
    "/api/supervisor/updateBonusFlag/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.updateBonusFlag
  );

  app.delete(
    "/api/supervisor/deleteSeller/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.deleteseller
  );

};