const db = require("../../models");
const PaymentTerm = db.paymentTerm;

// Create
exports.addPaymentTerm = async (req, res) => {
  try {
    const { lotteryCategoryName, conditions, seller, superVisor } = req.body;
    const subAdmin = req.userId;

    // Uniqueness check: only active terms (effectiveUntil = null)
    const checkQuery = { subAdmin, lotteryCategoryName, effectiveUntil: null };
    if (seller)      { checkQuery.seller = seller;          checkQuery.superVisor = null; }
    else if (superVisor) { checkQuery.superVisor = superVisor; checkQuery.seller = null;    }
    else             { checkQuery.seller = null;             checkQuery.superVisor = null; }

    const exists = await PaymentTerm.findOne(checkQuery);
    if (exists) {
      return res.status(400).send({ message: "Payment term already exists for this scope and lottery. Please update the existing one." });
    }

    const paymentTerm = new PaymentTerm({
      subAdmin,
      lotteryCategoryName,
      conditions,
      seller:     seller     || null,
      superVisor: superVisor || null,
      effectiveFrom:  new Date(),
      effectiveUntil: null,
    });
    await paymentTerm.save();

    const populated = await PaymentTerm.findById(paymentTerm._id)
      .populate('seller',     'userName')
      .populate('superVisor', 'userName');
    res.send(populated);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read — supports ?scope=all|seller|supervisor&seller=id&supervisor=id
exports.readPaymentTermBySubAdminId = async (req, res) => {
  try {
    const { scope, seller, supervisor } = req.query;
    const query = { subAdmin: req.userId, effectiveUntil: null };

    if (scope === 'seller') {
      query.superVisor = null;
      query.seller = seller ? seller : { $ne: null };
    } else if (scope === 'supervisor') {
      query.seller = null;
      query.superVisor = supervisor ? supervisor : { $ne: null };
    } else {
      // Default: subAdmin-level (no seller, no supervisor)
      query.seller = null;
      query.superVisor = null;
    }

    const paymentTerms = await PaymentTerm.find(query)
      .populate('seller',     'userName')
      .populate('superVisor', 'userName');
    res.send(paymentTerms);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update — archives the old record and creates a new version
exports.updatePaymentTerm = async (req, res) => {
  try {
    const oldTerm = await PaymentTerm.findById(req.params.id);
    if (!oldTerm) return res.status(404).send({ message: 'Payment term not found' });

    // Archive old term
    oldTerm.effectiveUntil = new Date();
    await oldTerm.save();

    // Create new version
    const newTerm = new PaymentTerm({
      subAdmin:            oldTerm.subAdmin,
      lotteryCategoryName: oldTerm.lotteryCategoryName,
      seller:              oldTerm.seller     || null,
      superVisor:          oldTerm.superVisor || null,
      conditions:          req.body.conditions || oldTerm.conditions,
      effectiveFrom:       new Date(),
      effectiveUntil:      null,
    });
    await newTerm.save();

    const populated = await PaymentTerm.findById(newTerm._id)
      .populate('seller',     'userName')
      .populate('superVisor', 'userName');
    res.send(populated);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete
exports.deletePaymentTerm = async (req, res) => {
  try {
    const paymentTerm = await PaymentTerm.findByIdAndDelete(req.params.id);
    if (!paymentTerm) return res.status(404).send({ message: 'Not found' });
    res.send({ message: 'Deleted', paymentTerm });
  } catch (error) {
    res.status(500).send(error);
  }
};
