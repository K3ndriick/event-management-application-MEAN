/**
 * Import the Category schema.
 * @const
 */
const Category = require('../models/event-category.js');

/**
 * Import the Event schema.
 * @const
 */
const Event = require('../models/event.js');

/**
 * Import the Operation schema.
 * @const
 */
const Operation = require("../models/operation.js");


module.exports = {

    // Student 1
    /**
     * Handles a HTTP POST request to the route '/33207798/create-category'.
     * @name createCategory
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    createCategory: async function (req, res) {
        try {
            
            let objCategory = new Category({ name: req.body.name, description: req.body.description, image: req.body.image });
            objCategory.modifyId=generateRandomId();
            await objCategory.save();

            //Update the recordsCreated in Operation
            await Operation.updateOne({modifyId:"Operation"},{$inc:{recordsCreated:1}});


            res.redirect("/category/33207798/list-category");
            // res.status(200).json(objCategory)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.errors['name'].reason});
        }
    },
    

    /**
     * Handles a HTTP GET request to the route '/33207798/list-category'.
     * @name showAllCategory
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    showAllCategory: async function (req, res) {
        try {
            let categoryList = await Category.find();
            res.render("listCategory.html", { records: categoryList });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'showAllCategory Error' });
        }
    },


    /**
     * Handles a HTTP GET request to the route '/33207798/search-category'.
     * @name filterAllCategory
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    filterAllCategory: async function (req, res) {
        try {
            let keyWordFilter = req.query.keyword;;
            //Will return a default keyWord if button is pressed at Home page
            if(req.query.keyword==undefined){
                keyWordFilter ="Lorem";
            }

            let filteredCategories = await Category.find({ description: { $regex: keyWordFilter, $options: 'i' } });
                    
            //Render to listCategory with filtered categories 
            res.render('listCategory.html', { records: filteredCategories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'filterAllCategory Error' });
        }
    },


    /**
     * Handles a HTTP POST request to the route '/33207798/delete-category'.
     * @name deleteCategory
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    deleteCategory: async function (req, res) {
        try {
            const {categoryId} = req.body;
            let demandedCategory;
            let demandedEventArray;
            let deletedCategory;
            
            
            //Demanded category

            //For _id object id
            if (categoryId.length==24){
                demandedCategory=await Category.findOne({_id:categoryId});
                demandedEventArray=demandedCategory.eventList;
                deletedCategory=await Category.deleteOne({_id:categoryId});
            }

            else{
                demandedCategory=await Category.findOne({modifyId:categoryId});
                demandedEventArray=demandedCategory.eventList;
                deletedCategory=await Category.deleteOne({modifyId:categoryId});
            }

            //Demanded events

            await Event.deleteMany({_id:{$in:demandedEventArray}});
          

            if(deletedCategory.deletedCount>0){
                //Update the recordsCreated in Operation
            await Operation.updateOne({modifyId:"Operation"},{$inc:{recordsDeleted:1}});
            }

            




              

            let categoryList = await Category.find();
            //Render to listCategory with filtered categories 
            res.render('listCategory.html', { records: categoryList });
        } 
        
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'filterAllCategory Error' });
        }
    },


    /**
     * Handles a HTTP GET request to the route ''/33207798/event/:eventId''.
     * @name showEventDetails
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    showEventDetails: async function (req, res) {
        try {
            let categoryString='';
            let eventId=req.params.eventId;
            let demandedEvent;
            let defaultEvent=new Event({name:'DEFAULT EVENT',description:'This is default event', startDateTime:new Date('2023-08-02T17:13'),  durationInMinutes:60, isActive: true,image:'/event-category.png', capacity:4, ticketsAvailable:3,  categoryId:[]});
            defaultEvent.modifyId='DEF-000'


            //For _id object id
            if (eventId.length==24){
                demandedEvent=await Event.findOne({_id:eventId});
            }
            demandedEvent=await Event.findOne({modifyId:eventId});

            if(demandedEvent==null){
                demandedEvent=defaultEvent;
                categoryString=""
            }

            else{

                let categoryObjectId=[...demandedEvent.categoryList];
                for (let i=0; i<categoryObjectId.length; i++){
                    let demandedCategory=await Category.findOne({_id:categoryObjectId[i]});
                    categoryString+=demandedCategory.modifyId+" ";
                }
            }


            res.render('showEvent',{ event: demandedEvent,formatEndTime:demandedEvent.formatStartEndDateTime()[1],formatDuration:demandedEvent.formattedDurationInMinutes(),formatStartTime:demandedEvent.formatStartEndDateTime()[0],categoryString:categoryString});

            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'showEventDetails Error' });
        }
    },

    /**
     * Handles a HTTP GET request to the route '/33207798/add'.
     * @name insertCategoryApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    insertCategoryApi: async function (req, res) {
        try {

            let objCategory = new Category({ name: req.body.name, description: req.body.description, image: req.body.image });
            objCategory.modifyId=generateRandomId();
            await objCategory.save();

            //Update the recordsCreated in Operation
            await Operation.updateOne({modifyId:"Operation"},{$inc:{recordsCreated:1}});
            res.status(201).json({ id: objCategory.modifyId })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'insertCategoryApi Error' });
        }

    },


     /**
     * Handles a HTTP GET request to the route '/33207798/list'.
     * @name listCategoryApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    listCategoryApi: async function(req, res){
        try {
            const categoryList = await Category.find().populate('eventList');
            res.status(200).json(categoryList);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'listCategoryApi Error' });
        }
    },

    /**
     * Handles a HTTP DELETE request to the route '/33207798/delete'.
     * @name deleteCategoryApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    deleteCategoryApi: async function(req, res){
        try {
            const {categoryId} = req.body;

            demandedCategory=await Category.findOne({modifyId:categoryId});
            demandedEventArray=demandedCategory.eventList;
            let deletedCategory=await Category.deleteOne({modifyId:categoryId});

            await Event.deleteMany({_id:{$in:demandedEventArray}});

            if(deletedCategory.deletedCount>0){
                //Update the recordsCreated in Operation
            await Operation.updateOne({modifyId:"Operation"},{$inc:{recordsDeleted:1}});
            }

            res.status(200).json(deletedCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'deleteCategoryApi Error' });
        }
    },

    /**
     * Handles a HTTP DELETE request to the route '/33207798/update'.
     * @name updateCategoryApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    updateCategoryApi: async function(req, res){
        let updateCategoryStatus=await Category.updateOne({modifyId:req.body.categoryId},{$set:{name:req.body.name,description:req.body.description}});
        
         //Update the recordsCreated in Operation
         if (updateCategoryStatus.modifiedCount>0){
            await Operation.updateOne({modifyId:"Operation"},{$inc:{recordsUpdates:1}});
         }
         
        res.status(200).json(updateCategoryStatus)
    },



    // Student 2

    /**
     * Handles a HTTP POST request to the route '/event/add-event'.
     * @name createEvent
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    createEvent: async function (req, res) {
        try {

            let categoryModifyArray=req.body.CategoryId.split(',');

            
            //Get
            let categoryObjectIdArray=[];
            for (let i=0; i<categoryModifyArray.length; i++){
                let demandedCategory=await Category.findOne({modifyId:categoryModifyArray[i]});
                if (demandedCategory!=null){
                    categoryObjectIdArray.push(demandedCategory._id);
                }
                
            }



            let newEvent = new Event({name: req.body.Name,
                description: req.body.Description,
                startDateTime: req.body.StartDateTime,
                durationInMinutes: parseInt(req.body.DurationInMinutes),
                isActive: req.body.IsActive,
                image: req.body.Image,
                capacity: req.body.Capacity,
                ticketsAvailable: req.body.TicketsAvailable,
                categoryList: categoryObjectIdArray});
            newEvent.modifyId = idGenerator();
            await newEvent.save();
    
            //Update the recordsCreated in Operation
            await Operation.updateOne({modifyId:"Operation"},{$inc:{recordsCreated:1}});

            //Update the category eventList with the eventId

            await Category.updateMany({modifyId:{$in:categoryModifyArray}},{$push:{eventList:newEvent._id}});
    
            res.redirect('/kendrick/event/list-events');

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "error.errors['name'].reason" });
        }
    },


    /**
     * Handles a HTTP GET request to the route '/event/list-events'.
     * @name listEvents
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    listEvents: async function (req, res) {
        try {
            let eventsList = await Event.find();
            
            let categoryStringArray=[];

            for (let i=0; i<eventsList.length; i++){
                let categoryString='';
                const categoriesArray=[...eventsList[i].categoryList]
                for (let i=0; i<categoriesArray.length; i++){
                    let demandedCategory=await Category.findOne({_id:categoriesArray[i]});
                    if (demandedCategory!=null){
                        categoryString+=demandedCategory.modifyId+" "; 
                    }
                    
                }

                categoryStringArray.push(categoryString);

            }



          



            res.render('listEvents.html', { records: eventsList, categoryStringArray:categoryStringArray });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error: Unable to display all events, listEvents error" });
        }
    },


    /**
     * Handles a HTTP GET request to the route '/event/list-sold-out-events'.
     * @name listSoldOutEvents
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    listSoldOutEvents: async function (req, res) {
        try {
            let eventsList = await Event.find();
            res.render("listSoldOutEvents.html", { records: eventsList });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error: Unable to display all sold out events, listSoldOutEvents error" });
        }
    },



    /**
     * Handles a HTTP GET request to the route '/event/delete-event'.
     * @name deleteEvent
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    deleteEvent: async function (req, res) {
        try {

            const eventId=req.query.eventId;
            if (eventId==null){
                res.render("deleteEvent.html")
            }

            else{

                let eventToDelete = await Event.deleteOne({ modifyId: eventId });

                if(eventToDelete.deletedCount > 0) // if any records are deleted, number of operations needs to be updated
                {
                    // Update the recordsCreated in Operation
                    await Operation.updateOne({modifyId: "Operation"}, {$inc:{ recordsDeleted: 1 }});
                }
                
                // Render to listEvents html page
                res.redirect("/kendrick/event/list-events");
    

            }


        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Unable to delete event, deleteEvent error" });
        }
    },



    /**
     * Handles a HTTP GET request to the route '"/event/category-detail/:categoryId"'.
     * @name categoryDetail
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    categoryDetail: async function (req, res) {
        let defaultCategory=new Category({ name: "Default category", description: "This is default category", image: '/event-category.png' });
        defaultCategory.modifyId="Default Id";

        let demandedCategory=await Category.findOne({modifyId:req.params.categoryId});


        if(demandedCategory!=null){
            let demandedCategoryPopulate=await Category.findOne({modifyId:req.params.categoryId}).populate('eventList');
            let eventObjectArray=demandedCategoryPopulate.eventList;

            let eventFormattedCattegoryArray=[];

            for (let i=0; i<eventObjectArray.length; i++){
                let eventFormattedCattegory=await formatCategories(eventObjectArray[i]);
                eventFormattedCattegoryArray.push(eventFormattedCattegory);
            }

            res.render("categoryDetail", { categoryDetails: demandedCategory,records: eventObjectArray,eventFormattedCattegoryArray:eventFormattedCattegoryArray});
        }

        else{
            res.render("categoryDetail", { categoryDetails: defaultCategory,records: []});
        }





    },


    /**
     * Handles a HTTP P0ST request to the route '/event/add-event'.
     * @name createEventApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    createEventApi: async function (req, res) {
        try {

            let categoryModifyArray=req.body.categories.split(',');

            
            //Get
            let categoryObjectIdArray=[];
            for (let i=0; i<categoryModifyArray.length; i++){
                let demandedCategory=await Category.findOne({modifyId:categoryModifyArray[i]});
                if (demandedCategory!=null){
                    categoryObjectIdArray.push(demandedCategory._id);
                }
                
            }


            let newEvent = new Event({
                name: req.body.name,
                description: req.body.description,
                startDateTime: req.body.startDateTime,
                durationInMinutes: req.body.durationInMinutes,
                isActive: req.body.isActive,
                image: req.body.image,
                capacity: req.body.capacity,
                ticketsAvailable: req.body.ticketsAvailable,
                categoryList: categoryObjectIdArray
            });

            newEvent.modifyId = idGenerator();


            //Update categoryID
            await Category.updateMany({modifyId:{$in:categoryModifyArray}},{$push:{eventList:newEvent._id}});
            
            //Update the recordsCreated in Operation
            await Operation.updateOne({modifyId:"Operation"},{$inc:{recordsCreated:1}});

            await newEvent.save();

            res.status(201).json({ id: newEvent.modifyId });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Unable to create event, createEventApi error" });
        }
    },
    /**
     * Handles a HTTP GET request to the route '/event/list-events'.
     * @name listEventsApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    listEventsApi: async function (req, res) {
        try {
            const eventsList = await Event.find().populate('categoryList');
            res.status(200).json(eventsList);

        } catch (error) {
            console.error(errror);
            res.status(500).json({ error: "Error: Unable to display all events, listEventsApi error" });
        }
    },


    /**
     * Handles a HTTP DELETE request to the route '/event/delete-event'.
     * @name deleteEventApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    deleteEventApi: async function (req, res) {
        try {
            const {eventId} = req.body;

            let eventToDelete = await Event.deleteOne({ modifyId: eventId });

            if(eventToDelete.deletedCount > 0) // if any records are deleted, number of operations needs to be updated
            {
                // Update the recordsCreated in Operation
                await Operation.updateOne({modifyId: "Operation"}, {$inc:{ recordsDeleted: 1 }});
            }

            let eventsDatabase = await Event.find();
            // Render to listEvents html page
            res.status(200).json(eventToDelete);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Unable to delete event, deleteEventApi error" });
        }
    },

    /**
     * Handles a HTTP PUT request to the route '/event/update-event'.
     * @name updateEventApi
     * @function
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
    */
    updateEventApi: async function (req, res) {
        try {
            let updatedEvent=await Event.updateOne({ modifyId:req.body.eventId }, { $set: { name:req.body.name, capacity: req.body.capacity }} );
            res.status(200).json(updatedEvent);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Unable to update event, updateEventApi error" });
        }
    }
};



//Category schema method
/**
 * Generate a random id starts with C
 * Two random characters (or location code?)
 * Hypenated
 * Random 4 digit number
 * @name generateRandomId
 * @function
 * @returns {string} A formated random id string value.
 */
function generateRandomId(){
    const randomTwoCharc=Math.random().toString(36).substring(2, 2 + 2).toUpperCase();


    const min = 1000; // Minimum 4-digit number (inclusive)
    const max = 9999; // Maximum 4-digit number (inclusive)
    const randomFourDigitNum=Math.floor(Math.random() * (max - min + 1)) + min;

    return `C${randomTwoCharc}-${randomFourDigitNum}`;
}



// Event schema method
/**
 * A randomised event ID that starts with C, followed by 2 random alphabets, a hyphen and 4 random digits
 * @name idGenerator
 * @function
 * @returns {string} A randomised string value which is an event ID
 */
function idGenerator()
{
    const firstChar = "E";
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    const firstAlphabetIndex = Math.floor(Math.random() * alphabets.length);
    const secondAlphabetIndex = Math.floor(Math.random() * alphabets.length);
    // Math.floor() is used to make sure that the generated number is within the length of the alphabets
  
    const firstAlphabet = alphabets[firstAlphabetIndex]; 
    const secondAlphabet = alphabets[secondAlphabetIndex];
    // accessing random alphabet using the generated index 
  
    let isFourDigit = false;

    while (! isFourDigit)
    {
        numCode = Math.floor(Math.random() * 9999);

        if (numCode >= 1000)
            isFourDigit = true;
    }

    // generating a random number that has 4 characters
    let finalId = firstChar + firstAlphabet + secondAlphabet + "-" + numCode;
  
    return finalId;
}

/**
 * Format the category string
 * @name formatCategories
 * @function
 * @param {Object} demandedEvent - The demanded event object.
 * @returns {string} A formated category string value.
 */
async function formatCategories(demandedEvent) {
    let categoryString='';
    let categoryObjectId=[...demandedEvent.categoryList];
    for (let i=0; i<categoryObjectId.length; i++){
        let demandedCategory=await Category.findOne({_id:categoryObjectId[i]});
        categoryString+=demandedCategory.modifyId+" ";
    }

    return categoryString;
}