/**
 * Installments CRUD controllers
 * @author Shuja Naqvi
 */
 const Companies = require("../models/Companies");
 const Admins = require("../models/Admins");
 
 /**
  * Create Installment
  * @param {object} req
  * @param {object} res
  */
 exports.create = async (req, res) => {
   try {
     const adminID = req.admin._id;
     req.body.admin = adminID;
     const companies = await Companies.create(req.body);
     if (companies) {
       const currentAdmin = await Admins.findByIdAndUpdate(
        adminID,
        {
          $push: {
            companies: companies._doc._id,
          },
        }
       );
       return res.status(202).json({ success: true, companies: companies });
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
     const admin = await Admins.findById(req.admin._id);
     if (!admin) {
       return res.status(404).json("You are not authorized ");
     }
     const companies = await Companies.find({
       admin: req.admin._id
     })
      //  .populate("admin")
      //  .populate("transactions"); // Finding all the installments from db
     res.json({ success: true, companies: companies }); // Success
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
     const admin = await Admins.findById(req.admin._id);
     if (!admin) {
       return res.status(404).json("You are not authorized ");
     }
     const companyID = req.params.companyId; // Getting Installment id from URL parameter
     const company = await Companies.findById(companyID)
      //  .populate("admin")
      //  .populate("transactions"); // Finding Installment by id
     if (company) return res.json({ success: true, installment: company });
     // Success
     else return res.json({ sucess: false, message: "No Company found" });
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
      const adminID = req.admin._id;
      const companyID = req.params.companyId;
      const companies = await Companies.findByIdAndUpdate(
        companyID,
        req.body,
        {
          new: true
        }
      );
      if (companies) {
        return res.status(202).json({ success: true, companies: companies });
      } else
        return res
          .status(404)
          .json({ success: false, message: "Unable to update Company" });
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
     const admin = await Admins.findById(req.admin._id); //To check Token belongs to admin
     if (!admin) {
       return res.status(404).json("You are not authorized ");
     }
     const companyID = req.params.companyId; // Getting installment id from URL parameter
     const company = await Companies.findByIdAndDelete(companyID); // Deleting the installment
     if (company){
      const updatedAdmin = await Admins.findByIdAndUpdate(
        req.admin._id,
        {
          $pull: {
            companies: company._doc._id
          }
        }
      ); // Update the admin companies array

      return res.json({
        success: true,
        message: "Company Deleted",
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
 