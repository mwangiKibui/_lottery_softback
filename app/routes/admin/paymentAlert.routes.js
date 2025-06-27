const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/admin/paymentAlert.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create
  app.post(
    "/api/admin/addpaymentalert",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addPaymentAlert
  );

  // Read
  app.get(
    "/api/admin/getpaymentalert",
    [authJwt.verifyToken],
    controller.listPaymentAlert
  );

  // Delete
  app.delete(
    "/api/admin/deletepaymentalert/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletePaymentAlert
  );
};