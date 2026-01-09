import React from 'react';
import axios from 'axios';
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';


const EnquiryTable = ({enquiryList, getEnquiryList, setFormData}) => {

    // created a state to manage the expanded and collapsed messages
    const [expandedMessages, setExpandedMessages] = useState({});
    // expandedMessages is an object that tracks each messsage's state, this contains key:value pairs of _id:boolean,
    // true - expanded, false - collapsed

    // function to manage the shift-unshift between collapsed/expanded --> See More/See Less
    const toggleMessage = (messageId) => {
        setExpandedMessages(prev => ({
            ...prev,    // collect all the key:value pairs already present in the expandedMessages
            [messageId]: !prev[messageId]   // true ko false karega, and viceverca
        }));
    };

    
    // for deleitng a specific entry
    let deleteRow = (delId) => {
        axios.delete(`http://localhost:5000/api/enquiry/delete/${delId}`)
            .then(() => {
                toast.success("Enquiry deleted successfully!");
                getEnquiryList();
            })
            .catch((err) => {
                toast.failure(err.message);
                getEnquiryList();
            })
    }


    // for updating a specific entry
    let updateRow = (updateId) => {
        axios.get(`http://localhost:5000/api/enquiry/single/${updateId}`)
            .then((res) => {
                let userData = res.data.enquiry;    // this api which we created in the backend sends the data of a single user with the name 'enquiry', and here we are collecting it
                console.log(userData);  // userData contains an object in which a single user's data is present with the id provided in params
                // now we have taken a handler from the parent component as a prop, which sets the data in the user form, so now we will give the userData present here to that function 
                setFormData(userData);
            })
    }


    return (
        <div className="bg-gray-200 p-4 rounded-md pt-4 max-h-[80vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <h2 className='text-[20px] pt-2 font-bold'>Enquiry List</h2>
            
            <div className="max-h-[70vh] mt-2 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Table className="table-fixed w-full">
                <TableHead className="sticky top-0 z-10">
                <TableRow>
                    <TableHeadCell className="w-[5%]">Sr. No.</TableHeadCell>
                    <TableHeadCell className="w-[15%]">Name</TableHeadCell>
                    <TableHeadCell className="w-[18%]">Email</TableHeadCell>
                    <TableHeadCell className="w-[14%]">Phone</TableHeadCell>
                    <TableHeadCell className="w-[32%]">Message</TableHeadCell>
                    <TableHeadCell className="w-[8%]">
                    <span >Edit</span>
                    </TableHeadCell>
                    <TableHeadCell className="w-[8%]">
                    <span >Delete</span>
                    </TableHeadCell>
                </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        enquiryList.length >= 1 ?
                        enquiryList.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="text-black">{index + 1}</TableCell>
                                    <TableCell className="text-black">{item.name}</TableCell>
                                    <TableCell className="text-black">{item.email}</TableCell>
                                    <TableCell className="text-black">{item.phone}</TableCell>
                                    <TableCell className="text-black">
                                        <div className={expandedMessages[item._id] ? '' : 'line-clamp-1'}>
                                            {item.message}
                                        </div>
                                        {!expandedMessages[item._id] && item.message.length > 40 && (
                                            <button 
                                            onClick={() => toggleMessage(item._id)}
                                            className="text-blue-500 text-sm mt-1 hover:text-blue-700 cursor-pointer"
                                            >
                                                ...see more
                                            </button>
                                        )}
                                        {expandedMessages[item._id] && (
                                            <button 
                                            onClick={() => toggleMessage(item._id)}
                                            className="text-blue-500 text-sm mt-1 hover:text-blue-700 cursor-pointer"
                                            >
                                                see less...
                                            </button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => updateRow(item._id)} className="bg-blue-500 text-white px-5 py-3 rounded-md cursor-pointer">Edit</button>
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => deleteRow(item._id)} className="bg-red-500 text-white px-5 py-3 rounded-md cursor-pointer">Delete</button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        :
                        <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                            <TableCell colSpan={7} className="text-center">No Data Found</TableCell>
                        </TableRow>
                    }
                    
                
                
                </TableBody>
            </Table>
            </div>
        </div>
    )
}

export default EnquiryTable;