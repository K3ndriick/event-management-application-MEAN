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



// Student 2 Tasks 2, 3, 4
// router API methods
/**
 * Uses an API to handle a HTTP POST request to the route "/event/add-event" to add a new event.
 *
 * @name post
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.post("/event/add-event", statCont.createEventApi);


/**
 * Uses an API to handle a HTTP GET request to the route "/event/list-events" to list down all the available events.
 *
 * @name get
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.get("/event/list-events", statCont.listEventsApi);


/**
 * Uses an API to handle a HTTP DELETE request to the route "/event/delete-event" to delete an event.
 *
 * @name delete
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.delete("/event/delete-event", statCont.deleteEventApi);


/**
 * Uses an API to handle a HTTP PUT request to the route "/event/update-event" to update an event.
 *
 * @name put
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 */
router.put("/event/update-event", statCont.updateEventApi);



module.exports = router;