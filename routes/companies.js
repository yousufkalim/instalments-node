/**
 * Companies CRUD routes
 * @author Umar Bin Ayaz
 */
 const router = require("express").Router();
 const companies = require("../controllers/companies");
 const { checkAuth } = require("../middleware/checkAuth");
 const {
   validateCompanies,
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
   validateCompanies,
   isValidated,
   companies.create
 );
 
 // Read
 router.get("/", checkAuth, companies.getAll); // Get all companies at once
 router.get("/:companyId", checkAuth, companies.getById); // Get one company by it's id

 //Update company
 router.put("/:companyId", checkAuth, companies.update); // Update a specific company by it's id
 
 // Delete
 router.delete("/:companyId", checkAuth, companies.delete); // delete a specific company by it's id
 
 // Export
 module.exports = router;
 