import React, { useState } from 'react'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';

  
const UpdateComplaint = () => {
  const url = "http://localhost:5000/api/complaints"
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [issue, setIssue] = useState("")
  const [department, setDepartment] = useState("")
  const [timeIn, setTimeIn] = useState("")
  const [timeOut, setTimeOut] = useState("")
  const [outcome, setOutcome] = useState("")
  const [MIS_Officer, setMIS_Officer] = useState("")
  const [confirmationOfficer, setConfirmationOfficer] = useState("")
  const [error, setError] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();

    const complaint = {email, date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer}

    const fetchComplaints = await fetch(`${url}/get-complaints`)
    const complaintsJson = await fetchComplaints.json(0)

    const response = await fetch(`${url}`, {
      method: 'PUT', 
      body: JSON.stringify(complaint),
      headers: {
        'Content-Type': 'application/json'
      }

    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    
    if (response.ok) {
      setEmail('')
      setDate('')
      setIssue('')
      setDepartment('')
      setTimeIn('')
      setTimeOut('')
      setOutcome('')
      setMIS_Officer('')
      setConfirmationOfficer('')
      console.log("Added ", json)
    }
  }


  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder='john@doe.com'
              onChange={(e)=>setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              id="date"
              onChange={(e)=>setDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="issue">Detailed Issue</Label>
            <Input
              type='textarea'
              name="issue"
              id="issue"
              placeholder="What challenge are you facing?"
              onChange={(e)=>setIssue(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="department">Department</Label>
            <Input
              type={"select"}
              name="department"
              id="department"
              onChange={(e)=>setDepartment(e.target.value)}
            >
                <option value="" hidden>Department</option>
                <option value={"Human Resource"}>Human Resource</option>
                <option value={"Public Relation"}>Public Relation</option>
                <option value={"Audit"}>Audit</option>
                <option value={"Finance"}>Finance</option>
                <option value={"Research & Monitoring Evaluation"}>Research & Monitoring Evaluation</option>
                <option value={"Shipper Services"}>Shipper Services</option>
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
          {error && <p>{error}</p>}
        <Button>Submit</Button>

      </Form>
    </div>
  )
}

export default UpdateComplaint