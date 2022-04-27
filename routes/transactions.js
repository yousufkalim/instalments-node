/**
 * Companies CRUD routes
 * @author Umar Bin Ayaz
 */
 const router = require("express").Router();
 const transactions = require("../controllers/transactions");
 const { checkAuth } = require("../middleware/checkAuth");
 const {
  validateTransactions,
   isValidated,
 } = require("../middleware/validators");
 /**
  * ////////////////////////// Routes /////////////////////////
  * @method post Create company
  * @method get get all companys
  * @method get get company by id
  * @method put update company
  * @method delete delete company
  */
 
 // Create - company
 router.post(
   "/",
   checkAuth,
   validateTransactions,
   isValidated,
   transactions.create
 );
 
 // Read
 router.get("/all/:companyId", checkAuth, transactions.getAll); // Get all companies at once
 router.get("/single/:transactionId", checkAuth, transactions.getById); // Get one company by it's id

 //Update company
 router.put("/:transactionId", checkAuth, transactions.update); // Update a specific company by it's id
 
 // Delete
 router.delete("/:transactionId", checkAuth, transactions.delete); // delete a specific company by it's id
 
 // Export
 module.exports = router;
 