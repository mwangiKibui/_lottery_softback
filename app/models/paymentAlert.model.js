const mongoose = require("mongoose");

const paymentAlertModel = new mongoose.Schema(
  {
    // The admin who created the payment term
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: String,
      required: true,
    },
    message:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required:true
    }
  },
  {
    // Adds createdAt and updatedAt fields to the schema
    timestamps: true,
  }
);

const PaymentAlert = mongoose.model("PaymentAlert", paymentAlertModel);

module.exports = PaymentAlert;
