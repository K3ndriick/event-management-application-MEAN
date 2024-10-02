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



// Student 1 Task 5
//Create new category
/**
 * Handles a HTTP GET request to the route '/33207798/add-category' and then renders the 'addCategory' html template.
 *
 * @name get
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/33207798/add-category', function (req, res) {
    res.render('addCategory');
});

/**
 * Handles the POST request to create a new category.
 *
 * @name post
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post("/33207798/add-category-post", statCont.createCategory);


//post the category json data to html file show it out 
// Show all categories
/**
 * Handles a HTTP GET request to the route '/33207798/list-category'.
 * @name get
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get("/33207798/list-category", statCont.showAllCategory);


//List filtered categories
/**
 * Handles a HTTP GET request to the route '/33207798/search-category'.
 * @name get
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get("/33207798/search-category", statCont.filterAllCategory);


//Delete categories
/**
 * Handles a HTTP GET request to the route '/33207798/delete-category' and then renders the 'deleteCategory' html template.
 *
 * @name get
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/33207798/delete-category', (req, res) => {
    res.render('deleteCategory')
});

/**
 * Handles the POST request to delete a category.
 *
 * @name post
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post("/33207798/delete-category-post", statCont.deleteCategory);


//Show Event details
/**
 * Handles a HTTP GET request to the route '/33207798/event/:eventId'.
 * @name get
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/33207798/event/:eventId',statCont.showEventDetails);



module.exports = router;