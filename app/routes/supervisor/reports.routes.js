const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/supervisor/reports.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Get sale reports
  app.get(
    "/api/supervisor/getSaleReports",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getSaleReports
  );

  app.get(
    "/api/supervisor/getSellDetails",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getSellDetails
  );

  app.get(
    "/api/supervisor/getSellDetailsByGameCategory",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getSellDetailsByGameCategory
  );

  app.get(
    "/api/supervisor/getSellDetailsByAllLoteryCategory",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getSellDetailsByAllLoteryCategory
  );

  app.get(
    "/api/supervisor/getSellGameNumberInfo",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getSellGameNumberInfo
  );

};