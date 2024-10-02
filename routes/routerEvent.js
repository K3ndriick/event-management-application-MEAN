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



// Student 2 Task 5
// Add Event
/**
 * Handles a HTTP GET request to the route "/event/add-event" and then renders the "addEvent" html template.
 *
 * @name get
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.get("/event/add-event", function(req, res)
{
  res.render("addEvent");
});

/**
 * Handles the POST request to create a new event.
 *
 * @name post
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.post("/event/add-event-post", statCont.createEvent);


// List Events
/**
 * Handles a HTTP GET request to the route "/event/list-events".
 * 
 * @name get
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.get("/event/list-events", statCont.listEvents);


// List Sold Out Events
/**
 * Handles a HTTP GET request to the route "/event/list-sold-out-events".
 * 
 * @name get
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.get("/event/list-sold-out-events", statCont.listSoldOutEvents);


// Category Details
/**
 * Handles a HTTP GET request to the route "/event/category-detail/:categoryId".
 * 
 * @name get
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.get("/event/category-detail/:categoryId", statCont.categoryDetail);


// Delete Event
/**
 * Handles a HTTP GET request to the route "/event/delete-event" and then renders the "deleteEvent" html template.
 *
 * @name get
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.get("/event/delete-event", statCont.deleteEvent);




module.exports = router;