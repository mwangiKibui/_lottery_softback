const mongoose = require("mongoose");

const paymentTermSchema = new mongoose.Schema(
  {
    subAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Optional scope: null = applies to all sellers under subAdmin
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    superVisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    lotteryCategoryName: {
      type: String,
      required: true,
    },
    conditions: {
      type: [
        {
          gameCategory: { type: String },
          position:     { type: Number },
          condition:    { type: Number },
        },
      ],
    },
    // Versioning: null = was always effective (records created before versioning)
    effectiveFrom: {
      type: Date,
      default: null,
    },
    // null = still active; set to a date when superseded by an update
    effectiveUntil: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const PaymentTerm = mongoose.model("PaymentTerm", paymentTermSchema);
module.exports = PaymentTerm;
