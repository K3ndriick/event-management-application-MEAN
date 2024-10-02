/**
 * Import mongoose module.
 * @const 
 */
const mongoose = require("mongoose");


// Tracking the number of operations that have been commenced
/**
 * Representing the Operation schema that's used to track the number of operations.
 * @namespace operationSchema
 */
const operationSchema = mongoose.Schema({
	/**
     * The modifyId field for the operation schema.
     * @member {string}
     * @default "Operation"
     */
	modifyId: {
		type: String,
		default: "Operation"
	},

	/**
     * The number of records created.
     * @member {number}
     * @default 0
     */
    recordsCreated: {
		type: Number,
        default: 0
	},

	/**
     * The number of records deleted.
     * @member {number}
     * @default 0
     */
    recordsDeleted: {
		type: Number,
        default: 0
	},

	/**
     * The number of records updated.
     * @member {number}
     * @default 0
     */
    recordsUpdates: {
		type: Number,
        default: 0
	}
});



module.exports = mongoose.model("Operation", operationSchema) ;