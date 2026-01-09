let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate, extractSingleEnquiry } = require('../controllers/enquiryController');
const validateEnquiryData = require('../middlewares/validateEnquiryData');
const jwtValidator = require('../middleware/authMiddleware');

// we move our routing functionality from index.js to here in routes folder, but here now 'app' will not handle routes, instead we use instance of Router class which manages the routing efficiently and we store all the routes in one variable
// NOTE - in short we can say that, enquiryRoutes contains all the routes defined in this file,
let enquiryRoutes = express.Router();

// insert route
enquiryRoutes.post('/insert', validateEnquiryData, enquiryInsert)    // enquiryInsert is a controller function 

// NOTE: 
// 1. enquiryRoutes(in routes folder) takes controller function from controllers folder
// 2. handlers in enquiryController function (in controllers folder) takes models from models folder

enquiryRoutes.get('/view', jwtValidator, enquiryList);
enquiryRoutes.delete('/delete/:id', jwtValidator, enquiryDelete);
enquiryRoutes.get('/single/:id', jwtValidator, extractSingleEnquiry);
enquiryRoutes.put('/update/:id', jwtValidator, enquiryUpdate);



module.exports = enquiryRoutes;