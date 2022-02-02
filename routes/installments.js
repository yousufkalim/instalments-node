/**
 * Installments CRUD routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const installments = require("../controllers/installments");
const { checkAuth } = require("../middleware/checkAuth");
const {
  validateInstallment,
  isValidated,
} = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Create Installment
 * @method get get all installments
 * @method get get installment by id
 * @method put update Installment
 * @method delete delete Installment
 */

// Create - Installment
router.post(
  "/",
  checkAuth,
  validateInstallment,
  isValidated,
  installments.create
);

// Read
router.get("/", checkAuth, installments.getAll); // Get all Installments at once
router.get("/:installmentId", checkAuth, installments.getById); // Get one installment by it's id

//PayInstallment
router.put("/:installmentId", checkAuth, installments.payInstallment); // Update a specific installment by it's id

// Delete
router.delete("/:installmentId", checkAuth, installments.delete); // delete a specific installment by it's id

// Export
module.exports = router;
