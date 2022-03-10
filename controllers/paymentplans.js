/**
 * PaymentPlan CRUD controllers
 * @author Yousuf Kalim
 */
const PaymentPlans = require("../models/PaymentPlans");
const Admins = require("../models/Admins");
const Users = require("../models/Users");
const Installments = require("../models/Installments");

/**
 * Create Payment-Plan
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    const adminID = req.admin._id;
    const mark_up = req.body.total_payment * (req.body.mark_up / 100);
    req.body.monthly_installment = (
      (mark_up + (req.body.total_payment - req.body.deposit_payment)) /
      req.body.total_installments
    ).toFixed(0);
    const payment = await PaymentPlans.findOne(req.body);
    if (payment) {
      return res
        .status(404)
        .json({ success: false, message: "Plan Already exists" });
    }
    const plan = await PaymentPlans.create(
      {
        ...req.body,
        admin: adminID
      }
    );
    if (plan) return res.status(202).json({ success: true, plan });
    else
      return res
        .status(403)
        .json({ success: false, message: "Unable to create Plan" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all Plans
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const paymentPlans = await PaymentPlans.find(); // Finding all the Plans from db
    res.json({ success: true, paymentPlans }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
/**
 * Get Plan by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const planId = req.params.planId; // Getting paln id from URL parameter
    const paymentplan = await PaymentPlans.findById(planId); // Finding paymentplan by id
    if (paymentplan) return res.json({ success: true, paymentplan });
    // Success
    else return res.json({ sucess: false, message: "No Plan found" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update plan
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const planId = req.params.planId; // Getting plan id from URL parameter
    const paymentplan = await PaymentPlans.findByIdAndUpdate(planId, req.body, {
      new: true,
    }); // Updating the plan
    res.json({ success: true, paymentplan }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete PaymentPlan
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    console.log(req.admin, "Admin");
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const planId = req.params.planId; // Getting plan id from URL parameter
    const paymentplans = await PaymentPlans.findByIdAndDelete(planId); // Deleting the plan
    if (paymentplans){
      const users = await Users.updateMany(
        {
          // Everyone
        },
        {
          $pull: {
            payment_plan: paymentplans._doc._id
          }
        }
      );
      const installments = await Installments.deleteMany(
        {
          plan: paymentplans._doc._id
        },
      );
      return res.json({
        success: true,
        message: "Deleted Succssfully",
        paymentplans,
      });
    } else {
      return res.json({
        success: false,
        message: "Already Deleted",
      });
    }
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
