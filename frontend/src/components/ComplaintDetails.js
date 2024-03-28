import React, { useState} from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Button, ButtonGroup, Form, FormGroup, Input, Label } from "reactstrap";


const ComplaintDetails = ({ complaint, handleComplaintUpdate, handleComplaintDelete, showUpdateForm, onClose }) => {
  if (!complaint) {
    return null; 
  }

  const sendMail = async () => {
    console.log("Send mail")
  }


  return (
    <div>
      <Card>
        <CardHeader>
        </CardHeader>
        {console.log("complaint in complaintDetails is ", complaint)}
        <CardBody>
          <Table striped hover>
            <tbody>
              <tr>
                <th>Date</th>
                <td>{complaint.date}</td>
              </tr>
              <tr>
                <th>Detailed Issue</th>
                <td>{complaint.issue}</td>
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
              <th>Confirmation Officer</th>
              <td>{complaint.confirmationOfficer}</td>
            </tr>
            </tbody>
          </Table>
        </CardBody>
        <ButtonGroup>
          <Button 
          color="primary"
          onClick={() => handleComplaintUpdate(complaint)}
          >
            Update
          </Button>
          <Button 
            color="danger"
            onClick={() => handleComplaintDelete(complaint._id)}>
            Delete
          </Button>
          <Button 
            color="warning"
            onClick = {sendMail}
          >
            Send Mail
          </Button>
        </ButtonGroup>
      </Card>

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
        const response = await fetch(`http://localhost:5000/api/complaints/update-complaint/${id}`, {
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
          <Label for="issue">Detailed Issue</Label>
          <Input
            type="textarea"
            name="issue"
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
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
        <Button type="submit" color="primary">Update</Button>
      </Form>
    );
  };
  

export default ComplaintDetails;
