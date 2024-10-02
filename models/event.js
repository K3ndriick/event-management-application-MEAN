// Student 2 Task 1

/**
 * Import mongoose module.
 * @const 
 */
const mongoose = require("mongoose");


/**
 * Representing the Event schema that is used to construct event objects.
 * @namespace eventSchema
 */
let eventSchema = mongoose.Schema({
    /**
     * modifyId field for Event.
     * @member {string}
     */
    modifyId: {type: String},

    /**
     * Event name.
     * @member {string}
     * @required
     */
    name: {type: String, required: true},

    /**
     * Event description.
     * @member {string}
     */
    description: {type: String},

    /**
     * Date & time that the event will start.
     * @member {date}
     * @required
     */
    startDateTime: {type: Date, required: true},

    /**
     * Duration of the event in minutes.
     * @member {number}
     * @required
     */
    durationInMinutes: {type: Number, required: true},

    /**
     * Event is active Boolean status.
     * @member {boolean}
     * @default true
     */
    isActive: {type: Boolean, default: true},

    /**
     * Category image.
     * @member {string}
     */
    image: {type: String},

    /**
     * Capacity size of an event.
     * @member {number}
     * @validation capacityValue >= 10 && capacityValue <= 2000 - Event capacity must be no smaller than 10 and no greater than 2000
     * @default 1000
     */
    capacity: {
        type: Number,
        validate: {
			validator: function (capacityValue) {
				return capacityValue >= 10 && capacityValue <= 2000;
			},
			message: "Event capacity must be no smaller than 10 and no greater than 2000",
		},
        default: 1000,
    },

    /**
     * Number of available tickets for an event.
     * @member {number}
     */
    ticketsAvailable: {
        type: Number,
        default: function () {
            if (this.capacity != null ) {
                return this.capacity;
            } else {
                return 1000;
            }
        }
    },

    /**
     * An array of category references that are associated with an event.
     * @member {Array<ObjectId>}
     * @ref 'Category'
     * @required
     */
    categoryList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
});


/**
 * Formats the given number, and returns it in a time format of either hours and minutes, hours or minutes
 * @method
 * @name formattedDurationInMinutes
 * @function
 * @returns {string} A formatted time string 
 */
eventSchema.methods.formattedDurationInMinutes = function () {

    let time;
    let minutes = this.durationInMinutes % 60;
    let hours = Math.floor(this.durationInMinutes / 60);

    if (minutes!=0 && hours !=0){time = hours + " hour(s) " + minutes + " minute(s)";}
    
    else if (minutes!=0 && hours ==0){time =  minutes + " minute(s)";}

    else if (minutes==0 && hours !=0){time = hours + " hour(s) ";}

    else{time = 0 + " hour(s) ";}

    return time;
};

/**
 * Formats the given start date time and end date time
 * @method
 * @name formatStartEndDateTime
 * @function
 * @returns {Array} An array containing event start date time and event end date time 
 */
eventSchema.methods.formatStartEndDateTime = function () {

    let startTime = this.startDateTime;
    let endTime = new Date(startTime.getTime() + this.durationInMinutes * 60 * 1000);

    let formattedstarttime=startTime.toLocaleString('en-AU')

    let formattedEndtime=endTime.toLocaleString('en-AU')

    return [formattedstarttime,formattedEndtime];

};



module.exports = mongoose.model("Event", eventSchema);