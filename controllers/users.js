/**
 * User CRUD controllers
 * @author Yousuf Kalim
 */
const Users = require("../models/Users");
const Admins = require("../models/Admins");
const installmentPlans = require("../models/PaymentPlans");
const Installments = require("../models/Installments");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT || 10;

/**
 * Create User - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    console.log("Admin", req.admin);
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const email = req.body.email;
    const existingUser = await Users.findOne({ email }); // Finding already existing user
    // Extra Validations
    if (existingUser) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }
    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }
    const findInstallment = await installmentPlans.findById(
      req.body.payment_plan
    );
    if (!findInstallment) {
      return res.json({ success: false, message: "Invalid PaymentPlan Id" }); //Failure
    }
    console.log(findInstallment.monthly_installment, "Monthly");
    let user = await Users.create(req.body); // Adding user in db
    for (let i = 1; i <= findInstallment.total_installments; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() + i);
      let installment = await Installments.create({
        user: user._id,
        due_date: month,
        plan: findInstallment._id,
        paid_amount: findInstallment.monthly_installment,
        user: user._id,
      });
      user.installments.push(installment._id);
      await user.save();
    }
    // Done
    return res.json({ success: true, user }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all users
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const users = await Users.find().populate("payment_plan"); // Finding all the users from db
    res.json({ success: true, users }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get user by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const userId = req.params.userId; // Getting user id from URL parameter
    const user = await Users.findById(userId)
      .populate("payment_plan")
      .populate("installments"); // Finding user by id
    if (user) return res.status(202).json({ success: true, user });
    // Success
    else
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update user
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email });
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const userId = req.params.userId; // Getting user id from URL parameter
    console.log(req.body.payment_plan, "Plan");
    if (!req.body.payment_plan) {
      let user = await Users.findByIdAndUpdate(
        userId,
        {
          name: req.body.name,
          cnic: req.body.cnic,
          email: req.body.email,
          gender: req.body.gender,
          number: req.body.number,
        },
        { new: true }
      );
      return res
        .status(202)
        .json({ success: true, message: "user updated successfully", user });
    }
    let existingPlan = await Users.findOne({
      payment_plan: req.body.payment_plan,
    });
    if (existingPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan Already Exist" });
    }
    let findPlan = await installmentPlans.findById(req.body.payment_plan);
    let Updateuser = await Users.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        cnic: req.body.cnic,
        email: req.body.email,
        gender: req.body.gender,
        number: req.body.number,
        $push: {
          payment_plan: req.body.payment_plan,
        },
      },
      {
        new: true,
      }
    ); // Updating the user
    for (let i = 1; i <= findPlan.total_installments; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() + i);
      let installment = await Installments.create({
        user: Updateuser._id,
        due_date: month,
        plan: findPlan._id,
        paid_amount: findPlan.monthly_installment,
      });
      Updateuser.installments.push(installment._id);
      await Updateuser.save();
    }
    console.log(Updateuser);
    return res.json({ success: true, Updateuser }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete user
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const admin = await Admins.findOne({ email: req.admin.email }); //To check Token belongs to admin
    if (!admin) {
      return res.status(404).json("You are not authorized ");
    }
    const userId = req.params.userId; // Getting user id from URL parameter
    const user = await Users.findByIdAndDelete(userId); // Deleting the user
    if (user) return res.json({ success: true, message: "User Deleted", user });
    // Success
    else return res.json({ success: false, message: "Already Deleted" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
