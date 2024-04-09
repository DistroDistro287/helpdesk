import React, { useEffect, useState} from "react";
import {  Card, CardHeader, CardBody, CardTitle, CardText, Table, Button, ButtonGroup, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { useSearchParams } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ComplaintDetails = ({ complaint, handleComplaintUpdate, handleComplaintDelete, showUpdateForm, onClose }) => {
    const [confirmationFeedback, setConfirmationFeedback] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [modal, setModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [mailStatus, setMailStatus] = useState(false)
    const [result, setResult] = useState("")
    
    const toggleModal = () => {
      setModal(!modal);
    };

    const toggleMailStatus = () => {
      setMailStatus(true)
      localStorage.setItem('mailStatus', true)
      console.log("toggled")
    }
    
    const handleViewComplaint = () => {
      toggleModal();
    };
    
    if (!complaint) {
      return null; 
    }
    
    
    const sendMail = async () => {
      toggleMailStatus()
      alert('Mail Sent')
      try {
      await fetch("https://helpdesk-back.glitch.me/api/complaints/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: complaint.email, id: complaint._id })
        
      });

      // toast.success("Mail sent!")
      console.log("Email sent successfully!");
    } catch (error) {
      toast.error("Error sending email. Please try again", error);
      console.error("Error sending email:", error);
    }
  }






// 



  return (
    <div>
      <Card>
      <ToastContainer />
        <CardHeader>
        </CardHeader>
        {/* {console.log("complaint in complaintDetails is ", complaint)} */}
        <CardBody>
          {/* <Table striped hover>
            <tbody>
            <tr>
              <th>Confirmation Officer</th>
              <td>{complaint.confirmationOfficer}</td>
            </tr>
              <tr>
                <th>Date</th>
                <td>{complaint.date}</td>
              </tr>
              <tr>
                <th>Department</th>
                <td>{complaint.department}</td>
              </tr>
              <tr>
              <th>Time In</th>
              <td>{complaint.timeIn}</td>
            </tr>
            <tr>
              <th>Outcome</th>
              <td>{complaint.outcome}</td>
            </tr>
            <tr>
              <th>MIS Officer</th>
              <td>{complaint.MIS_Officer}</td>
            </tr>
            <tr>
              <th>Confirmation Officer Feedback</th>
              <td>{complaint.confirmationOfficerFeedback}</td>
            </tr>
            <tr>
              <th>Detailed Issue</th>
            </tr>
            <tr style={{width: '100%'}}>
            <td style={{width: '100%'}}>
              <textarea
                value={complaint.issue}
                style={{ width: '100%', height: '200px', resize: 'none' }}
                readOnly
              />
            </td>
            </tr>
            </tbody>
          </Table>  */}
          <div className="d-flex flex-column">
            <Row className="my-2">
              <Col><strong>CONFIRMATION OFFICER</strong></Col>
              <Col>{complaint.confirmationOfficer}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>DATE</strong></Col>
              <Col>{complaint.date}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>DEPARTMENT</strong></Col>
              <Col>{complaint.department}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>FEEDBACK</strong></Col>
              <Col>{complaint.confirmationOfficerFeedback}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>TIME IN</strong></Col>
              <Col>{complaint.timeIn}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>TIME OUT</strong></Col>
              <Col>{complaint.timeOut}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>OUTCOME</strong></Col>
              <Col>{complaint.outcome}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>MIS OFFICER</strong></Col>
              <Col>{complaint.MIS_Officer}</Col>
            </Row>
            <Row className="my-2">
              <Col><strong>ISSUE</strong></Col>
            </Row>
              <Row className="my-2">
                <Col className="">
                  {complaint.issue}
                </Col>
              </Row>
          </div>
        </CardBody>
        <ButtonGroup>
          <Button 
          color="primary"
          onClick={() => handleComplaintUpdate(complaint)}
          >
            Edit
          </Button>
          <Button 
            color="danger"
            onClick={() => handleViewComplaint()}>
            Delete
          </Button>
          <Button 
            color="secondary"
            onClick={sendMail}
            disabled={mailStatus} 
          >
            {mailStatus ? "Mail Sent":"Send Mail"}
          </Button>

        </ButtonGroup>
      </Card>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          <ConfirmDelete handleComplaintDelete={handleComplaintDelete} complaint={complaint} toggle={toggleModal}/>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="danger"
            onClick={() => toggleModal()}>Close</Button>
        </ModalFooter>
      </Modal>

      {complaint && showUpdateForm && (
        <div>
        <div colSpan="10">
            <UpdateForm complaint={complaint} />
        </div>
        </div>
        )}
    </div>
  );
};


const UpdateForm = ({ complaint }) => {
    const [date, setDate] = useState(complaint.date);
    const [issue, setIssue] = useState(complaint.issue);
    const [department, setDepartment] = useState(complaint.department);
    const [timeIn, setTimeIn] = useState(complaint.timeIn)
    const [timeOut, setTimeOut] = useState(complaint.timeOut)
    const [outcome, setOutcome] = useState(complaint.outcome)
    const [MIS_Officer, setMIS_Officer] = useState(complaint.MIS_Officer)
    const [confirmationOfficer, setConfirmationOfficer] = useState(complaint.confirmationOfficer)
    const [complaints, setComplaints] = useState("")
    const [id, setId] = useState(complaint._id)
  
    console.log('id is ', id)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedComplaint = { date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer };
      
      try {
        // const response = await fetch(`http://localhost:5000/api/complaints/update-complaint/${id}`, {
        const response = await fetch(`https://helpdesk-back.glitch.me/api/complaints/update-complaint/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedComplaint),
        });
        const json = await response.json();
  
        if (response.ok) {
          console.log("Complaint updated successfully:", json.message);
          alert("Complaint updated successfully");
        }else {
          console.error("Failed to update complaint:", json.error);
        }
      } catch (error) {
        console.error("Error updating complaint:", error);
      }
      console.log("Updated complaint:", updatedComplaint);
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            type="text"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="department">Department</Label>
          <Input
            type="select"
            name="department"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="Human Resource">Human Resource</option>
            <option value="Public Relation">Public Relation</option>
            <option value="Audit">Audit</option>
            <option value="Finance">Finance</option>
            <option value="Research & Monitoring Evaluation">Research & Monitoring Evaluation</option>
            <option value="Shipper Services">Shipper Services</option>
          </Input>
        </FormGroup>
        <FormGroup>
              <Label for="time-in">Time In</Label>
              <Input
                type='time'
                name="time-in"
                id="time-in"
                onChange={(e)=>setTimeIn(e.target.value)}
                value={timeIn}
              />
            </FormGroup>
            <FormGroup>
              <Label for="time-out">Time Out</Label>
              <Input
                type='time'
                name="time-out"
                id="time-out"
                onChange={(e)=>setTimeOut(e.target.value)}
                value={timeOut}
              />
            </FormGroup>
            <FormGroup>
              <Label for="outcome">Outcome</Label>
              <Input
                type={"select"}
                name="outcome"
                id="outcome"
                onChange={(e)=>setOutcome(e.target.value)}
              >
                  <option value="" hidden>Outcome</option>
                  <option value={"Resolved"}>Resolved</option>
                  <option value={"Not Resolved"}>Not Resolved</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="mis-officer">MIS Officer</Label>
              <Input
                type={"select"}
                name="mis-officer"
                id="mis-officer"
                onChange={(e)=>setMIS_Officer(e.target.value)}
              >
                  <option value="" hidden>MIS Officer</option>
                  <option value={"Ben"}>Ben</option>
                  <option value={"Daniel"}>Daniel</option>
                  <option value={"NSP"}>NSP</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="confirmation-officer">Confirmation Officer</Label>
              <Input
                type='text'
                name="confirmation-officer"
                id="confirmation-officer"
                placeholder="Confirmation Officer"
                onChange={(e)=>setConfirmationOfficer(e.target.value)}
                value={confirmationOfficer}
              />
            </FormGroup>
            <FormGroup>
          <Label for="issue">Detailed Issue</Label>
          <Input
            type="textarea"
            name="issue"
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary">Update</Button>
      </Form>
    );
  };
  

export default ComplaintDetails;
