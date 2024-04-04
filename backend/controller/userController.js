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


    // let transporter = nodemailer.createTransport({
    //     service: 'outlook',
    //     port: 587,
    //     secure: false, 
    //     auth: {
    //       user: 'mis@shippers.org.gh',
    //       pass: 'Ship1234', 
    //     },
    //     tls: {
    //       ciphers: 'SSLv3',
    //       rejectUnauthorized: true,
    //     },
    //   });

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



  const confirmFeedback = asyncHandler(async (req, res) => {
    const satisfactionConfirmation = req.query['confirm-satisfaction']; 
    const { id } = req.params;
    const complaint = await UserComplaint.findById(id);
  
    if (!complaint) {
      res.status(404);
      throw new Error('Complaint not found');
    }

    // console.log('feedback is: ', req.query.feedback)
    
    if (feedback === 'satisfied') {
        console.log("in feedback ID is - ", id)
        res.status(200).json({message: "Satisfaction confirmed"});
    } else if (feedback === 'dissatisfied') {
        console.log("in feedback,ID is - ", id)
        res.status(200).json({ message: 'Dissatisfaction confirmed' });
    } else {
        res.status(400).json({ error: 'Invalid confirmation value' });
    }
    // res.json(feedback)
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

        if (satisfactionConfirmation === 'true') {
            complaint.confirmationOfficerFeedback = "Satisfied"
            await complaint.save();

            console.log("Confirmation complaint is - ", complaint.confirmationOfficerFeedback)
            res.status(200).json({ message: "Satisfaction confirmed" });
        } else if (satisfactionConfirmation === 'false') {
            complaint.confirmationOfficerFeedback = "Not Satisfied"
            await complaint.save();
            res.status(200).json({ message: "Dissatisfaction confirmed" });
        } else {
            res.status(400).json({ message: "Invalid satisfaction confirmation value" });
        }
    } catch (error) {
        console.error("Error confirming satisfaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

const confirmDissatisfaction = asyncHandler(async (req, res) => {
    console.log('user dissatisfaction ')
    res.status(201).json({message: "Dissatisfaction confirmed"})
})



export {
    authenticateUser, 
    registerUser, 
    sendComplaint, 
    getComplaints, 
    updateComplaint, 
    removeComplaint,
    sendConfirmationEmail,
    confirmFeedback,
    confirmSatisfaction,
    confirmDissatisfaction
}