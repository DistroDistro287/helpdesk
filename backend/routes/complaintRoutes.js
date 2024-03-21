import express from "express";
import {authenticateUser, registerUser,getComplaints, sendComplaint, updateComplaint, removeComplaint } from "../controller/UserController.js"

const router = express.Router();

router.post('/auth', authenticateUser)
router.post('/add', registerUser)
router.put('/update-complaint/:id', updateComplaint)
router.post('/send-complaint', sendComplaint)
router.get('/get-complaints', getComplaints)
router.delete('/remove-complaint/:id', removeComplaint)



export default router;