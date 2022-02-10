/**
 * PaymentPlan schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const paymentplanSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
    },
    deposit_payment: {
      type: Number,
      required: true,
    },
    total_installments: {
      type: Number,
      required: true,
    },
    mark_up: {
      type: Number,
      required: true,
    },
    total_payment: {
      type: Number,
      required: true,
    },
    monthly_installment: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("paymentplans", paymentplanSchema);
