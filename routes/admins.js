/**
 * Admin  routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const admins = require("../controllers/admins");
const { upload } = require("../middleware/multer");
const { validateAdmin, isValidated } = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Admin signup
 */

// Create - Admin Signup
router.post(
  "/",
  upload.single("image"),
  validateAdmin,
  isValidated,
  admins.create
);
// Export
module.exports = router;
