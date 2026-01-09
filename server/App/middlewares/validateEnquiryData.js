// data validation ke liye middleware, for security purpose
// using  a library for data validation called express-validator

// import body and validationResult from express-validator, 
// body and validationResult already present hai express-validator me
const { body, validationResult } = require('express-validator');


const validateEnquiryData = [

    body('email').isEmail().withMessage('Invalid Email. Missing "@" and "."'),
    body('phone').isLength({min:10, max:10}).withMessage('Phone must be 10 digits'),
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('message').isLength({ min: 3 }).withMessage('Message must be at least 3 characters'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {    // if errors array has some errors in it return errors
            return res.status(400).send({errors: errors.array()});
        }

        // if no errors, proceed to next controller
        next();
    }

]

module.exports = validateEnquiryData;