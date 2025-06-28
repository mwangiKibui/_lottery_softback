const db = require("../../models");
const PaymentAlert = db.paymentAlert;

exports.listPaymentAlert = async (req, res) => {
  try {
    let paymentAlerts = await PaymentAlert.find(
        {
            company:req.user.id
        }
    );
    res.send({success: true, data: paymentAlerts});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};