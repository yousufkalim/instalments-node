/**
 * PaymentPlan schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const paymentplanSchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      required: true
    },
    product_description: {
      type: String,
      required: true
    },
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
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("paymentplans", paymentplanSchema);
