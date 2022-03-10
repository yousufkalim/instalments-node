/**
 * Admin schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");
// Schema
const adminsSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
    photo: {
      type: String,
    },
    companies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "companies",
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "products",
    },
  },
  {
    timestamps: true,
  }
);
// Model
module.exports = mongoose.model("Admins", adminsSchema);
