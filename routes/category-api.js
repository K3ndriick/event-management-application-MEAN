/**
 * Importing the Express framework.
 * @const
 */
const express = require('express');

/**
 * Creating an instance of router.
 * @const
 */
const router = express.Router();

/**
 * Import the State controller.
 * @const
 */
const statCont = require("../controller/state");



// Student 1 Tasks 2, 3, 4
// router API methods
/**
 * Uses an API to handle a HTTP POST request to the route "/33207798/add" to add a new category.
 *
 * @name post
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.post("/33207798/add", statCont.insertCategoryApi);


/**
 * Uses an API to handle a HTTP GET request to the route "/33207798/list" to display all the available categories.
 *
 * @name get
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.get("/33207798/list", statCont.listCategoryApi);


/**
 * Uses an API to handle a HTTP DELETE request to the route "/33207798/delete" to delete a category.
 *
 * @name delete
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.delete("/33207798/delete", statCont.deleteCategoryApi);


/**
 * Uses an API to handle a HTTP PUT request to the route "/33207798/update" to update a category.
 *
 * @name put
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.put("/33207798/update", statCont.updateCategoryApi);



module.exports = router;