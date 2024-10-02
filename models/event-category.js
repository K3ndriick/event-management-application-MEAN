// Student 1 Task 1

/**
 * Import mongoose module.
 * @const 
 */
const mongoose = require("mongoose");


/**
 * Representing the Category schema that is used to construct category objects.
 * @namespace categorySchema
 */
const categorySchema = mongoose.Schema({
    /**
     * modifyId field for Category.
     * @member {string}
     */
    modifyId: {type: String},

    /**
     * Category name.
     * @member {string}
     * @required
     * @validation /^[a-zA-Z0-9]+$/ - Name should be alphanumeric
     */
	name: {
		type: String,
        validate: {
            validator: function (nameValue) {
                return /^[a-zA-Z0-9]+$/.test(nameValue);
            },
            reason: "Name should be alphanumeric"
        },
        required: true
	},

    /**
     * Category description.
     * @member {string}
     */
	description: {type: String},

    /**
     * Category image.
     * @member {string}
     */
    image: {type: String},

    /**
     * Category creation date.
     * @member {Date}
     * @default Date.now
     */
    createdAt:{type: Date, default: Date.now},

    /**
     * An array of event references that are associated with a category.
     * @member {Array<ObjectId>}
     * @ref 'Event'
     */
    eventList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});


/**
 * Format the given date object into a string representation with both date and time.
 * @method
 * @name formatDate
 * @function
 * @returns {string} A formatted string representation of the date with both date and time.
 */
categorySchema.methods.formattedDate =  function () {
    return this.createdAt.toLocaleString('en-AU');
};



module.exports = mongoose.model("Category", categorySchema);