const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {

    try{

        const authHeader = req.headers.authorization;    // isme apna token save hoga

        // agar token nhi hai 
        if(!authHeader) {
            return res.status(401).send({status: 0, message: "Token in not present in headers!"})
        }

        // NOTE: authHeader me token 2 types se likha ho sakta hai, 1 - jo 'Bearer ' se start ho, 2 - jo directly accessible ho
        // To uske liye separate logic likhna padega
        let token;
        if(authHeader.startsWith('Bearer ')){
            // abhi token aisa dikhta hai --> 'Bearer kljsdlfhoijopfj', to isase sirf token extract karna hai
            token = authHeader.split(' ')[1];
            // token was in string format --> splitted that string and created an array with two values --> note the second value is our actual token, 
        } else {
            // yaa fir token 'Bearer ' se start nhi hota hai,
            token = authHeader; // matlab token ke aage 'Bearer ' nhi likha thaa,
        }

        // ab verification karo tok
        
        
        next();

    } catch (err) {
        res.status(401).send({status: 0, message: "Invalid Token"})
    }
}

module.exports = jwtValidator;