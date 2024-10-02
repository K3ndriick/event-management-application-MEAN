/**
 * @author Lim Jun Kee <jlim0211@student.monash.edu>
 * @author Kendrick Lee Jhia Chuen <klee0117@student.monash.edu>
 */



/**
 * Import express module.
 * @const 
 */
const express = require('express');

/**
 * Import path module.
 * @const 
 */
const path = require("path");

/**
 * Import mongoose module.
 * @const 
 */
const mongoose = require("mongoose");



// Importing object models
/**
 * Import the Operation model.
 * @const
 */
const Operation = require("./models/operation.js");

/**
 * Import the Category model.
 * @const
 */
const Category = require('./models/event-category.js');

/**
 * Import the Event model.
 * @const
 */
const Event = require('./models/event.js');



// Importing routers & APIs
/**
 * Import the categoryRouter module for routing.
 * @const
 */
const categoryRouter = require("./routes/routerCategory.js");

/**
 * Import the categoryRouterApi module for routing.
 * @const
 */
const categoryRouterApi = require("./routes/category-api.js");

/**
 * Import the eventRouter module for routing.
 * @const
 */
const eventRouter = require("./routes/routerEvent.js");

/**
 * Import the eventRouterApi module for routing.
 * @const
 */
const eventRouterApi = require("./routes/event-api.js");



// Setting up express()
/**
 * Create a new Express application instance.
 * @const 
 */
const app = express();



//Setup the view Engine
/**
 * Configure the view engine for rendering HTML templates using EJS.
 * 
 * @name engine
 * @function
 * @param {string} ext - The file extension to associate with the view engine.
 * @param {Function} callback - The function used to render templates.
 * 
 */
app.engine('html', require('ejs').renderFile);

/**
 * Set the view engine to be used for rendering templates.
 * 
 * @name set
 * @function
 * @param {string} setting - The name of the view engine.
 * @param {any} val  - value that assign to the "view engine" setting.
 * 
 */
app.set('view engine', 'html');

/**
 * Set the directory path for views/templates.
 * 
 * @name set
 * @function
 * @param {string} setting - The setting name.
 * @param {any} val - The directory path.
 *
 */
app.set('views', path.join(__dirname, 'views'));



//Setup the static assets directories
/**
 * Serve static files from the "images" directory.
 * 
 * @name use
 * @function
 * @param {string} path - The directory path to serve static files from.
 * 
 */
app.use(express.static('images'));

/**
 * Serve static files from the "css" directory.
 *
 * @name use
 * @function
 * @param {string} path - The directory path to serve static files from.
 */
app.use(express.static('css'));



/**
 * Serve static files from the "node_modules/bootstrap/dist/css" directory
 *
 * @name use
 * @function
 * @param {string} path - The directory path to serve static files from.
 * 
 */
app.use(express.static("node_modules/bootstrap/dist/css"));



// Serve static files and JSON parsing middleware
/**
 * Parse JSON data from request bodies using Express middleware.
 * 
 * @name use
 * @function
 * @param {Object} options - Options for parsing the JSON data.
 *
 */
app.use(express.json());

/**
 * Parse URL-encoded data from request bodies using Express middleware.
 * 
 * @name use
 * @function
 * @param {Object} options - Options for parsing the URL-encoded data.
 * @param {boolean} options.extended - Specifies whether to use the `qs` library for parsing (true) or the `querystring` library (false).
 * 
 */
app.use(express.urlencoded({extended: true}));



// MongoDB database url connection
/**
 * The URL for connecting to the MongoDB database.
 * @const {string}
 */
const url = "mongodb://localhost:27017/eventCategoryDb";



// Setting up connection to MongoDB
/**
 * @name connect
 * @function
 * @param {string} url - The URL of the MongoDB database.
 */
async function connect(url) {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}



// Setting up index.html page
/**
 * Handles a HTTP GET request to the route '/' and renders the 'index' html template.
 * @name get
 * @function
 * @param {string} path - Route path that the route handler is associated with.
 * @param {Function} callback - express callback
 */
app.get("/", async function (req, res) {

  try {
    let categoryCount = await Category.countDocuments();
    let eventCount = await Event.countDocuments();
    let operationObj = await Operation.findOne({ modifyId: "Operation" });

    if (!operationObj) {
      operationObj = new Operation();
      await operationObj.save();
    }

    res.render("index", { categoryCount, eventCount, operationObj });

  } catch (err) {
    console.error("Error handling '/' route:", err);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Serve static files from the "views" directory
 *
 * @name use
 * @function
 * @param {string} path - The directory path to serve static files from.
 */
app.use(express.static('views'));

// Mounting routers
/**
 * Mount the specified router under the "/category" path in the Express application for categories.
 * 
 * @name use
 * @function
 * @param {string} path - The base path to mount the router under.
 * @param {Object} router - The Express router object to be mounted.
 *
 */
app.use("/category", categoryRouter);

/**
 * Mount the specified router under the "/api/v1/category" path in the Express application for API routing.
 * 
 * @name use
 * @function
 * @param {string} path - The base path to mount the router under.
 * @param {Object} router - The Express router object to be mounted.
 *
 */
app.use("/api/v1/category", categoryRouterApi);

/**
 * Mount the specified router under the "/kendrick" path in the Express application for events.
 * 
 * @name use
 * @function
 * @param {string} path - The base path to mount the router under.
 * @param {Object} router - The Express router object to be mounted.
 *
 */
app.use("/kendrick", eventRouter);

/**
 * Mount the specified router under the "/kendrick/api/v1" path in the Express application for API routing.
 * 
 * @name use
 * @function
 * @param {string} path - The base path to mount the router under.
 * @param {Object} router - The Express router object to be mounted.
 *
 */
app.use("/kendrick/api/v1", eventRouterApi);


// Setting up port number
/**
 * The port on which the Express server is listening.
 * @const {number}
 */
const port = process.env.PORT || 8081;

/**
 * Starting the server and listening on the specified port.
 *
 * @name listen
 * @function
 * @param {number} port - The port which will be used by the server to listen.
 *
 */
app.listen(port, () => {
  console.log(`Server listening at : http://localhost:${port}`);
});

connect(url);