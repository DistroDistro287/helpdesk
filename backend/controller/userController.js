import asyncHandler from "express-async-handler"
import UserComplaint from "../models/userComplaint.js"
import nodemailer from 'nodemailer'

const authenticateUser = asyncHandler (async(req,res) => {
    res.status(200).json({message: "User auththenticated"})
})

const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({message: "User added"})
})


// create complaint
const sendComplaint = asyncHandler(async (req,res) => {
    const { email, date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer, confirmationOfficerFeedback} = req.body;
    const complaint = await UserComplaint.create({
        email, 
        date,
        issue, 
        department, 
        timeIn, 
        timeOut, 
        outcome, 
        MIS_Officer, 
        confirmationOfficer,
        confirmationOfficerFeedback: "Not Confirmed"
    })

    console.log("Confirmation Officer Feedback:", confirmationOfficerFeedback);

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
    const { id } = req.params;
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



const sendConfirmationEmail = asyncHandler(async (req, res) => {
    const email = req.body.email
    const id = req.body.id
    
    // const API_URL = "https://helpdesk-back.glitch.me/api/complaints"
    const API_URL = "http://localhost:5000/api/complaints"

    const confirmSatisfactionUrl = `${API_URL}/confirm-satisfaction?id=${id}&confirm-satisfaction=true`;
    const confirmDissatisfactionUrl = `${API_URL}/confirm-satisfaction?id=${id}&confirm-satisfaction=false`;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'distrodistro287@gmail.com',
            pass: 'bonfyxbjkgfglwaj'
        }
    });

    // Email content
    let mailOptions = {
        from: 'HELPDESK',
        to: email,
        subject: 'Confirmation of Service',
        html: `
        <html>
            <head></head>
            <body>

                <div>
                <p>Were you satisfied with the help received? Please confirm your satisfaction:</p>
                
                <strong>
                    <a href="${confirmSatisfactionUrl}" 
                        style="background-color: #00BD68; 
                        color: #FFFFFF; 
                        text-decoration: none; 
                        display: inline-block; 
                        padding: 10px 20px; 
                        border-radius: 5px;" 
                    > 
                    Confirm Satisfaction
                    </a>
                </strong>
                <br>


                
                <p>If you are dissatisfied, please click the button below:</p>

                <strong>
                    <a href="${confirmDissatisfactionUrl}" 
                        style="background-color: #E62C03; 
                        color: #FFFFFF; 
                        text-decoration: none; 
                        display: inline-block; 
                        padding: 10px 20px; 
                        border-radius: 5px;"
                    >
                        Confirm Dissatisfaction
                    </a>
                </strong>
            </div>
            </body>
        </html>`
    };
  
    console.log('Sending confirmation email...');
    console.log('req params email - ', req.body.email)
    console.log('id is - ', id)
    console.log('req.body - ', req.body.email)
  
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  })




const confirmSatisfaction = asyncHandler(async (req, res) => {
    try {
        const satisfactionConfirmation = req.query['confirm-satisfaction'];
        const id = req.query['id'];
        
        const complaint = await UserComplaint.findById(id);
        if (!complaint) {
          res.status(404);
          throw new Error('Complaint not found');
        }

        // check if officer already recevied a mail and confirmed or
        if (complaint.satisfactionConfirmed) {
            // return res.status(400).json({ message: "Satisfaction status already confirmed" });
            return res.status(400).send(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Helpdesk - Confirmation Status</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
                
                  <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333; margin-bottom: 20px;">Confirmation Status</h1>
                    <p style="color: #666; font-size: 16px;">Your response has already been recorded.</p>
                    <p style="color: #666; font-size: 16px;">Thank you</p>
                  </div>
                </body>
                </html>
                
                `
            );
        }

        if (satisfactionConfirmation === 'true') {
            complaint.confirmationOfficerFeedback = "Satisfied"
            complaint.satisfactionConfirmed = true;
            await complaint.save();

            console.log("Confirmation complaint is - ", complaint.confirmationOfficerFeedback)
            // res.status(200).json({ message: "Satisfaction confirmed" });
            return res.status(200).send(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Helpdesk - Confirmation status</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
                
                  <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333; margin-bottom: 20px;">Confirmation Status</h1>
                    <p style="color: #666; font-size: 16px;">Your response has been recorded.</p>
                    <p style="color: #666; font-size: 16px;">Thank you</p>
                  </div>
                </body>
                </html>
                
                `
            );
        } else if (satisfactionConfirmation === 'false') {
            complaint.confirmationOfficerFeedback = "Not Satisfied"
            complaint.satisfactionConfirmed = true;
            await complaint.save();
            // res.status(200).json({ message: "Dissatisfaction confirmed" });
            return res.status(200).send(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Helpdesk - Confirmation status</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
                
                  <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333; margin-bottom: 20px;">Confirmation Status</h1>
                    <p style="color: #666; font-size: 16px;">Your response has been recorded.</p>
                    <p style="color: #666; font-size: 16px;">Thank you</p>
                  </div>
                </body>
                </html>
                
                `
            );
        } else {
            // res.status(400).json({ message: "Invalid satisfaction confirmation value" });
            return res.status(400).send(
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Helpdesk - Confirmation status</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
                
                  <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333; margin-bottom: 20px;">Confirmation Status</h1>
                    <p style="color: #666; font-size: 16px;">Received an invalid response.</p>
                    <p style="color: #666; font-size: 16px;">Kindly contact MIS for assistance</p>
                  </div>
                </body>
                </html>
                
                `
            );
        }
    } catch (error) {
        console.error("Error confirming satisfaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})




export {
    authenticateUser, 
    registerUser, 
    sendComplaint, 
    getComplaints, 
    updateComplaint, 
    removeComplaint,
    sendConfirmationEmail,
    confirmSatisfaction
}