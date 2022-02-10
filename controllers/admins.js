/**
 * Admin CRUD controllers
 * @author Shuja Naqvi
 */
const Admins = require("../models/Admins");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT || 10;

/**
 * Create Admin - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { email, password, confirmPassword } = req.body; // Getting required fields from body
    const existingAdmin = await Admins.findOne({ email }); // Finding already existing Admin

    // Extra Validations
    if (existingAdmin) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    } else if (password !== confirmPassword) {
      // Passwords not same
      return res.status(403).json({
        success: false,
        message: "Password and Confirm Password are not same.",
      });
    }

    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }

    // Creating Admin
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8
    const admin = await Admins.create(req.body); // Adding user in db

    // Done
    res.json({ success: true, admin }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
