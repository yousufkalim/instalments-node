/**
 * Transactions schema
 * @author Umar Bin Ayaz
 */
 const mongoose = require("mongoose");

 // Schema
 const transactionSchema = new mongoose.Schema(
   {
     amount: {
       type: Number,
       required: true,
     },
     company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
     },
   },
   {
     timestamps: true,
   }
 );
 
 // Model
 module.exports = mongoose.model("transactions", transactionSchema);
 