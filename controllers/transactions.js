/**
 * Installments CRUD controllers
 * @author Shuja Naqvi
 */
 const Transactions = require("../models/Transactions");
 const Companies = require("../models/Companies");
 
 /**
  * Create Installment
  * @param {object} req
  * @param {object} res
  */
 exports.create = async (req, res) => {
   try {
     const { company } = req.body;
     const transactions = await Transactions.create(req.body);
     if (transactions) {
       const currentCompany = await Companies.findByIdAndUpdate(
        company,
        {
          $push: {
            transactions: transactions._doc._id,
          },
        }
       );
       return res.status(202).json({ success: true, transcations: transactions });
     } else
       return res
         .status(404)
         .json({ success: false, message: "Unable to create Company" });
   } catch (err) {
     // Error handling
     console.log("Error ----> ", err);
     res.status(500).json({ success: false, message: "Internal server error" });
   }
 };
 /**
  * Get all Installments
  * @param {object} req
  * @param {object} res
  */
 exports.getAll = async (req, res) => {
   try {
     const companyID = req.params.companyId;
     const transactions = await Transactions.find({
       company: companyID
     });
     res.json({ success: true, transactions: transactions }); // Success
   } catch (err) {
     // Error handling
     console.log("Error ----> ", err);
     res.status(500).json({ success: false, message: "Internal server error" });
   }
 };
 /**
  * Get Installment by id
  * @param {object} req
  * @param {object} res
  */
 exports.getById = async (req, res) => {
   try {
     const transactionID = req.params.transactionId;
     const transaction = await Transactions.findById(transactionID)
     if (transaction) return res.json({ success: true, transaction: transaction });
     // Success
     else return res.json({ sucess: false, message: "No transaction found" });
   } catch (err) {
     // Error handling
     console.log("Error ----> ", err.message);
     res.status(500).json({ success: false, message: "Internal server error" });
   }
 };
 /**
  * Update Company
  * @param {object} req
  * @param {object} res
  */
  exports.update = async (req, res) => {
    try {
      const transactionID = req.params.transactionId;
      const transactions = await Transactions.findByIdAndUpdate(
        transactionID,
        req.body,
        {
          new: true
        }
      );
      if (transactions) {
        return res.status(202).json({ success: true, transactions: transactions });
      } else
        return res
          .status(404)
          .json({ success: false, message: "Unable to update Transaction" });
    } catch (err) {
      // Error handling
      console.log("Error ----> ", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
 
 /**
  * Delete Company
  * @param {object} req
  * @param {object} res
  */
 exports.delete = async (req, res) => {
   try {
     const transactionID = req.params.transactionId; // Getting installment id from URL parameter
     const transaction = await Transactions.findByIdAndDelete(transactionID); // Deleting the installment
     if (transaction){
      const updatedCompany = await Companies.findByIdAndUpdate(
        transaction._doc.company,
        {
          $pull: {
            transactions: transaction._doc._id
          }
        }
      ); // Update the admin companies array

      return res.json({
        success: true,
        message: "Transaction Deleted",
      });
     }
     // Success
     else return res.json({ success: false, message: "Already Deleted" });
   } catch (err) {
     // Error handling
     console.log("Error ----> ", err);
     res.status(500).json({ success: false, message: "Internal server error" });
   }
 };
 