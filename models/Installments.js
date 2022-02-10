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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "paymentplans" },
  },
  {
    timestamps: true,
  }
);
// Model
module.exports = mongoose.model("installments", installmentsSchema);
