import asyncHandler from "express-async-handler"
import UserComplaint from "../models/userComplaint.js"


const authenticateUser = asyncHandler (async(req,res) => {
    res.status(200).json({message: "User auththenticated"})
})

const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({message: "User added"})
})


// create complaint
const sendComplaint = asyncHandler(async (req,res) => {
    const { email, date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer} = req.body;
    const complaint = await UserComplaint.create({
        email, 
        date,
        issue, 
        department, 
        timeIn, 
        timeOut, 
        outcome, 
        MIS_Officer, 
        confirmationOfficer
    })
    if (complaint) {
        res.status(201).json({complaint})
    } else {
       console.log("Invalid data")
    }
})


// read complaints
const getComplaints = asyncHandler(async (req,res) => {
    const complaints = await UserComplaint.find({}).sort({createdAt: -1})
    res.status(200).json({complaints})
})


// update complaint
const updateComplaint = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the complaint ID from the request parameters
    const { email, date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer } = req.body; // Get the updated complaint data from the request body
    const complaint = await UserComplaint.findById(id);
  
    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }
  
    // Update the complaint with the new values
    complaint.email = email || complaint.email;
    complaint.date = date || complaint.date;
    complaint.issue = issue || complaint.issue;
    complaint.department = department || complaint.department;
    complaint.timeIn = timeIn || complaint.timeIn;
    complaint.timeOut = timeOut || complaint.timeOut;
    complaint.outcome = outcome || complaint.outcome;
    complaint.MIS_Officer = MIS_Officer || complaint.MIS_Officer;
    complaint.confirmationOfficer = confirmationOfficer || complaint.confirmationOfficer;
  
    await complaint.save();
  
    res.status(200).json({ message: "Complaint updated", data: complaint });
  });
  


// delete complaint
const removeComplaint = asyncHandler(async (req,res) => {
    const {id} = req.params
    const complaint = await UserComplaint.findByIdAndDelete(id)

    if (!complaint) {
        res.status(404);
        throw new Error('Complaint not found');
      }    
      res.status(200).json({ message: "Complaint removed" });
})




export {authenticateUser, registerUser, sendComplaint, getComplaints, updateComplaint, removeComplaint}