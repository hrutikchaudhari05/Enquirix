import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EnquiryTable from './enquiry/EnquiryTable.jsx';
import { Label, TextInput, Textarea, Button } from 'flowbite-react';
import {ToastContainer, toast} from 'react-toastify';
import validateForm from './utils/validation.js';

function Enquiry(){
    let [enquiryList, setEnquiryList] = useState([]);   
    let [errors, setErrors] = useState({});
    let [isLoading, setIsLoading] = useState(false);    // state loading hai yaa nhi
    let [formData, setFormData] = useState({    // initially form data empty rahega
        name:'',
        email:'',
        phone:'',
        message:'',
        _id:''      // this is only in use when we are updating the data, 
    });

    let saveEnquiry = (e) => {
        e.preventDefault();
        // alert(formData.message)

        // prevent double clicks, if isLoading is already true then return from here itself
        if (isLoading) return;

        // set isLoading to true
        setIsLoading(true);

        // clear previous errors first
        // userForm re dikhaye huye errors ko hide karne ke liye ye step zaroori hai
        setErrors({});

        // data validation
        const errorsObj = validateForm(formData);   // this is errors object we got from the function validateForm
        console.log('Errors Object', errorsObj);

        // check if any errors are in errorsObj, if present the set the local state 'errors' with the errorsObj got from validateForm function
        if (Object.keys(errorsObj).length > 0){
            setErrors(errorsObj);   // this sets the errorsObj in local state named 'errors'
            console.log('Errors State', errors);    // this is the local state of errors 
            toast.error("Data entry failed!")
            setIsLoading(false)
            return;
        }
        
        // save and update logic is dependent on the fact whether formData has _id or not
        if(formData._id){
            // update logic
            axios.put(`http://localhost:5000/api/enquiry/update/${formData._id}`, formData)
            .then((res) => {
                console.log(res.data);
                toast.success('Enquiry updated successfully!');
                setFormData({
                    name:'',
                    email: '',
                    phone: '',
                    message: '',
                    _id: ''
                })
                getEnquiryList();
            })
            .catch((err) => {
                console.log(err.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
        } else {
            // insert logic
            axios.post('http://localhost:5000/api/enquiry/insert', formData)
            .then((res) => {
                console.log(res.data);
                toast.success('Enquiry saved Successfully!');
                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:''
                })
                getEnquiryList();
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }

        //alert('Form Submitted Successfully');
    }

    // handler for adding a particular value in formData
    let getValue = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    let getEnquiryList = () => {
        axios.get('http://localhost:5000/api/enquiry/view')
        .then((res) => {
            return res.data;
        })
        .then((finalData) => {
            if(finalData.status){
                setEnquiryList(finalData.enquiryList);
            }
        })
    }


    // ye code sirf ek baar run hoga, js app start hogi, bcuz yaha dependency array khaali rakha hai
    useEffect(() => {
        getEnquiryList();
    }, []);

    return (
        <div >
            <ToastContainer />
            <h1 className='text-[40px] text-center py-6 font-bold '>User Enquiry</h1>
            <div className="grid grid-cols-[25%_auto] gap-10 px-4 ">
                <div className="bg-gray-200 p-4 pb-8 rounded-md h-fit">
                    <h2 className='text-[20px] pt-2 font-bold'>Enquiry Form</h2>
                    <form action="" onSubmit={saveEnquiry} className="mt-2">
                        <div className="py-3">
                            <Label htmlFor='name' className="!text-black">Your Name</Label>
                            <TextInput type='text' value={formData.name} onChange={getValue} name='name' id="name" placeholder="Enter your name" required={true} />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <div className="py-3">
                            <Label htmlFor='email' className="!text-black">Your Email</Label>
                            <TextInput type='text' value={formData.email} onChange={getValue} name='email' id="email" placeholder="Enter your email" required={true} />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>
                        <div className="py-3">
                            <Label htmlFor='phone' className="!text-black">Your Phone</Label>
                            <TextInput type='text' value={formData.phone} onChange={getValue} name='phone' id="phone" placeholder="Enter your phone" required={true} />
                            {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                        </div>
                        <div className="py-3">
                            <Label htmlFor='message' className="!text-black">Your Message</Label>
                            <Textarea type='text' value={formData.message} onChange={getValue} name='message' id="message" placeholder="Enter your message" required={true} rows={4} />
                            {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                        </div>
                        <div className="py-3">
                            <Button type='submit' disabled={isLoading} className='w-full'>
                                {isLoading ? 'Submitting...' : (formData._id ? 'Update' : 'Sumbit')}
                            </Button>
                        </div>
                    </form>
                </div>
            
                <EnquiryTable enquiryList={enquiryList} getEnquiryList={getEnquiryList} setFormData={setFormData} />
                
            </div>
        </div>
    )
}



export default Enquiry