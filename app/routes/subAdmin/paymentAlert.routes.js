const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/subAdmin/paymentAlert.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Read
  app.get(
    "/api/subadmin/getpaymentalert",
    [authJwt.verifyToken],
    controller.listPaymentAlert
  );
};