const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/supervisor/paymentTerm.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Add payment term
  app.post(
    "/api/supervisor/addPaymentTerm",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.addPaymentTerm
  );

  app.get(
    "/api/supervisor/readPaymentTermBySubAdminId",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.readPaymentTermBySubAdminId
  );

  app.get(
    "/api/supervisor/readPaymentTermBySupervisorId",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.readPaymentTermBySupervisorId
  );

  app.patch(
    "/api/supervisor/updatePaymentTerm/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.updatePaymentTerm
  );

  app.delete(
    "/api/supervisor/deletePaymentTerm/:id",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.deletePaymentTerm
  );


};