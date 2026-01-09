const enquiryModel = require("../models/enquiry.model");


let enquiryInsert = (req, res) => {
    const {name, email, phone, message} = req.body;
    let newEnquiry = new enquiryModel({
        name: name, 
        email: email,
        phone: phone,
        message: message 
    });
    
    newEnquiry.save()
        .then((result) => {
            res.status(201).send({status: 1, message: 'new entry added successfully!', data: result});
        })
        .catch((err) => {
            res.status(500).send({status: 0, message: err.message});
        })
}

let enquiryList = async (req, res) => {
    let enquiry = await enquiryModel.find();
    res.send({status: 1, enquiryList:enquiry});
}

let enquiryDelete = async (req, res) => {
    let enId = req.params.id;
    let deleteEnquiry = await enquiryModel.deleteOne({_id:enId});
    res.send({status: 1, message: 'Enquiry deleted successfully', deleteEnquiry});
}

let extractSingleEnquiry = async (req, res) => {
    let enId = req.params.id;
    let enquiry = await enquiryModel.findOne({_id:enId});
    res.send({status: 1, enquiry});
}

let enquiryUpdate = async (req, res) => {
    try {
        let enId = req.params.id;
        let {name, email, phone, message} = req.body;
        let updatedObj = {
            name,
            email,
            phone, 
            message
        }
        let updateEnquiry = await enquiryModel.updateOne({_id: enId}, updatedObj);
        res.send({status: 1, message: 'Updated the enquiry successfully', updateEnquiry});
    } catch (err) {
        res.send({status: err.statusCode, message: err.message});        
    }
}

module.exports = { enquiryInsert, enquiryList, enquiryDelete, extractSingleEnquiry, enquiryUpdate };