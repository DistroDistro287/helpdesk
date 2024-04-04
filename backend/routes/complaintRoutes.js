import express from "express";
import {
    authenticateUser, 
    registerUser,
    getComplaints, 
    sendComplaint, 
    updateComplaint, 
    removeComplaint,
    sendConfirmationEmail,
    confirmFeedback,
    confirmSatisfaction,
    confirmDissatisfaction, 
} from "../controller/UserController.js"

const router = express.Router();

router.get('/get-complaints', getComplaints)
// router.post('/send-email', sendConfirmationEmail)
router.get('/confirm-feedback', confirmFeedback)
router.get('/confirm-satisfaction', confirmSatisfaction)
router.get('/confirm-dissatisfaction', confirmDissatisfaction)
router.post('/auth', authenticateUser)
router.post('/add', registerUser)
router.post('/send-complaint', sendComplaint)
router.put('/update-complaint/:id', updateComplaint)
router.delete('/remove-complaint/:id', removeComplaint)
// router.get('/getFB', getFeedback)


router.post('/send-email', (req, res) => {
    const { email, id } = req.body;
    sendConfirmationEmail(req, res, id); 
});


export default router;