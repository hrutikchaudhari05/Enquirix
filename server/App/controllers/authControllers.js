const userModel = require('../models/userdata.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupHandler = async (req, res) => {
    try {
        //extract userInfo from req.body or frontend
        const {name, email, password} = req.body;

        //check if the user with this email already exists or not 
        const existingUser = await userModel.findOne({email});

        // if user with this email already exists in the database then stop the further code execution and return a res here
        if(existingUser){
            res.send({status: 0, message: 'Email already registered! Please login...'});
        }

        // now we know the user with the email provided is not present in the database so we can directly register this user 

        // hash the password using bcrypt
        const hashedPass = await bcrypt.hash(password, 12);

        // create a new user object with the hashed password
        const newUser = new userModel({
            name, email, password: hashedPass
        });

        //save the newUser in the database
        newUser.save()
            .then(() => {
                res.send({status: 1, message: "New user registered successfully!"});
            })
    } catch (err) {
        res.send({status: 0, message: err.message});
    }
}

const loginHandler = async (req, res) => {

    try{
        const {email, password} = req.body;

        const existingUser = await userModel.findOne({email});

        if(!existingUser){
            res.send({status: 0, message: 'User not found! Please signup first...'});
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if(isPasswordMatch){

            // now we need to create a token, and pass it in result, for that we will use jwt
            const token = jwt.sign(
                { userId: existingUser._id },
                // yaha thoda dhyaan dena padega, userID ki jagah --> email bhi provide kr sakte hai
                process.env.JWT_SECRET_KEY,
                { expiresIn: '7d' }
            );

            res.send({status: 1, message: "User login successful...", token, user: {id:existingUser._id, name:existingUser.name, email}});
        } else {
            res.send({status: 0, message: 'Wrong password! Please enter correct password...'});
        }
    } catch (err) {
        res.send({status: 0, message: 'Server Error'});
    }

}


module.exports = {signupHandler, loginHandler};
