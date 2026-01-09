let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
require('dotenv').config();
let enquiryRoutes = require('./App/routes/enquiryRoutes')

// let authRoutes = require('./App/routes/authRoutes');

let app = express();
app.use(cors());
app.use(express.json());

// Route Imports
app.use('/api/enquiry', enquiryRoutes);

// using authRoutes for authentication purpose
// app.use('/api', authRoutes);

// connect to MongoDB
mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running...`);
        })
    })
    .catch(err => console.error('Could not connect to MongoDB...', err.message));
