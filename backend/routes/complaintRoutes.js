import express from "express";
import {
    getComplaints, 
    sendComplaint, 
    updateComplaint, 
    removeComplaint,
    sendConfirmationEmail,
    confirmSatisfaction,
} from "../controller/UserController.js"

const router = express.Router();

router.get('/get-complaints', getComplaints)
router.get('/confirm-satisfaction', confirmSatisfaction)
router.post('/send-complaint', sendComplaint)
router.put('/update-complaint/:id', updateComplaint)
router.delete('/remove-complaint/:id', removeComplaint)


router.post('/send-email', (req, res) => {
    const { email, id } = req.body;
    sendConfirmationEmail(req, res, id); 
});


export default router;