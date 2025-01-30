const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/supervisor/ticket.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // get ticket
  app.get(
    "/api/supervisor/getTickets",
    [authJwt.verifyToken, authJwt.isSuperVisor],
    controller.getTicket
  );

}