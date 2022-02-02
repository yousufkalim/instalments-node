/**
 * Installments CRUD controllers
 * @author Shuja Naqvi
 */
const Installments = require("../models/Installments");
const Admins = require("../models/Admins");
const PaymentPlans = require("../models/PaymentPlans");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT || 10;

/**
 * Create Installment
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { user, plan } = req.body;
    console.log("Body", req.body);
    const findUser = await Users.findById(user);
    const findPlan = await PaymentPlans.findById(plan);
    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not exist" });
    }
    if (!findPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan  not exist" });
    }
    const installments = await Installments.create(req.body);
    if (installments) {
      findUser.installments.push(installments._id);
      await findUser.save();
      return res.status(202).json({ success: true, installments });
    } else
      return res
        .status(404)
        .json({ success: false, message: "Unable to create Installment" });
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
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const installments = await Installments.find()
      .populate("user")
      .populate("plan"); // Finding all the installments from db
    res.json({ success: true, installments }); // Success
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
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const installmentId = req.params.installmentId; // Getting Installment id from URL parameter
    const installment = await Installments.findById(installmentId)
      .populate("user")
      .populate("plan"); // Finding Installment by id
    if (installment) return res.json({ success: true, installment });
    // Success
    else return res.json({ sucess: false, message: "No Installment found" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update Installment
 * @param {object} req
 * @param {object} res
 */

exports.payInstallment = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    req.body.submission_date = new Date();
    req.body.status = "paid";
    const installmentId = req.params.installmentId; // Getting installment id from URL parameter
    const installment = await Installments.findByIdAndUpdate(
      installmentId,
      req.body,
      {
        new: true,
      }
    )
      .populate("user")
      .populate("plan"); // Updating the installment
    res.json({ success: true, installment }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete Installment
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email }); //To check Token belongs to admin
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const installmentId = req.params.installmentId; // Getting installment id from URL parameter
    const installment = await Installments.findByIdAndDelete(installmentId); // Deleting the installment
    if (installment)
      return res.json({
        success: true,
        message: "Installment Deleted",
        installment,
      });
    // Success
    else return res.json({ success: false, message: "Already Deleted" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
