const db = require("../../models");
const PaymentAlert = db.paymentAlert;

// Create
exports.addPaymentAlert = async (req, res) => {
  try {
    const newPaymentAlert = new PaymentAlert({
        admin:req.user.id,
        ...req.body
    });
    const paymentAlert = await newPaymentAlert.save();
    res.status(201).send(paymentAlert);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.listPaymentAlert = async (req, res) => {
  try {
    let paymentAlerts = await PaymentAlert.find(
        {
            admin:req.user.id
        }
    ).populate('company','companyName')
    .lean();
    paymentAlerts = paymentAlerts.map((alert) => ({
        ...alert,
        company:alert.company.companyName
    }))
    res.send({success: true, data: paymentAlerts});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deletePaymentAlert = async (req, res) => {
  try {
    const paymentAlert = await PaymentAlert.findByIdAndDelete(req.params.id);
    if (!paymentAlert) {
      return res.status(404).send({ error: "Payment Alert not found" });
    }
    res.send({ message: "Payment Alert deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};