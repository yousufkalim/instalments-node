/**
 * Payment CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const paymentsplans = require("../controllers/paymentplans");
const { checkAuth } = require("../middleware/checkAuth");
const { validatePlan, isValidated } = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Create PaymentPlan
 * @method get get all plans
 * @method get get plan by id
 * @method put update plan
 * @method delete delete plan
 */

// Create - PaymentPlan
router.post("/", checkAuth, validatePlan, isValidated, paymentsplans.create);

// Read
router.get("/", checkAuth, paymentsplans.getAll); // Get all Plans at once
router.get("/:planId", checkAuth, paymentsplans.getById); // Get one Plan by it's id

//Update;
router.put("/:planId", checkAuth, paymentsplans.update); // Update a specific plan by it's id

// Delete
router.delete("/:planId", checkAuth, paymentsplans.delete); // delete a specific plan by it's id

// Export
module.exports = router;
