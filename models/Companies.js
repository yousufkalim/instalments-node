/**
 * Companies schema
 * @author Umar Bin Ayaz
 */
 const mongoose = require("mongoose");

 // Schema
 const companySchema = new mongoose.Schema(
   {
     name: {
       type: String,
       required: true,
     },
     address: {
       type: String,
       required: true,
     },
     contact: {
       type: String,
       required: true,
     },
     admin: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Admins",
     },
     transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactions",
      },
     ],
   },
   {
     timestamps: true,
   }
 );
 
 // Model
 module.exports = mongoose.model("companies", companySchema);
 