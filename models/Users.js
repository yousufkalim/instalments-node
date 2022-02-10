/**
 * User schema
 * @author Yousuf Kalim
 */
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnic: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    photo: String,
    number: String,
    installments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "installments",
      },
    ],
    payment_plan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "paymentplans",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("users", userSchema);
