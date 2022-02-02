/**
 * Installment schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");
// Schema
const installmentsSchema = new mongoose.Schema(
  {
    paid_amount: Number,
    due_date: Date,
    submission_date: Date,
    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "paymentplans" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);
// Model
module.exports = mongoose.model("installments", installmentsSchema);
