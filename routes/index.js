/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
const router = require("express").Router();

// Parent Routes
router.use("/admins", require("./admins")); // All the user routes
router.use("/users", require("./users")); // All the user routes
router.use("/auth", require("./auth")); // All the auth routes
router.use("/payments", require("./paymentplans")); // All the payments routes
router.use("/installments", require("./installments")); // All the installments routes
router.use("/companies", require("./companies")); // All the companies routes
router.use("/transactions", require("./transactions")); // All the transactions routes
// Export
module.exports = router;
