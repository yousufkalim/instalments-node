/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
const router = require("express").Router();

// Parent Routes
router.use("/admins", require("./admins")); // All the user routes
router.use("/users", require("./users")); // All the user routes
router.use("/auth", require("./auth")); // All the auth routes
router.use("/payments", require("./payments")); // All the payments routes
router.use("/installments", require("./installments")); // All the installments routes
// Export
module.exports = router;
