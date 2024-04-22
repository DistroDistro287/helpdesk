import React, { useState,useEffect } from 'react'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import apiConfig from '../apiConfig.mjs';
  
const NewComplaint = () => {
  const url = `${apiConfig.API_URL}/send-complaint`
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [issue, setIssue] = useState("")
  const [department, setDepartment] = useState("")
  const [timeIn, setTimeIn] = useState("")
  const [timeOut, setTimeOut] = useState("")
  const [outcome, setOutcome] = useState("")
  const [MIS_Officer, setMIS_Officer] = useState("")
  const [confirmationOfficer, setConfirmationOfficer] = useState("")
  const [confirmationOfficerFeedback, setConfirmationOfficerFeedback] = useState("")
  const [category, setCategory] = useState(""); 
  const [categoryOptions, setCategoryOptions] = useState(["Software", "Hardware", "Network"]);
  // const [categoryOptions, setCategoryOptions] = useState([]);

  const [error, setError] = useState('')

  const [selectedOption, setSelectedOption] = useState("");

  const onChangeDepartment = (e) => {
      setSelectedOption(e.target.value);
    };
  
    const clearFormFields = () => {
        document.getElementById("form").reset();
    }
  

    // useEffect(() => {
    //   // Fetch category options from API or local storage
    //   const fetchCategoryOptions = async () => {
    //     try {
    //       // Here, you can fetch the category options from an API endpoint or any other data source
    //       const fetchedCategoryOptions = ["Software", "Hardware", "Network"]; // Example: Replace with your actual fetch logic
    //       setCategoryOptions(fetchedCategoryOptions);
    //     } catch (error) {
    //       console.error("Failed to fetch category options:", error);
    //     }
    //   };
  
    //   fetchCategoryOptions();
    // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const complaint = {
        email,
        date,
        issue,
        department,
        timeIn,
        timeOut,
        outcome,
        MIS_Officer,
        confirmationOfficer,
        confirmationOfficerFeedback,
        category
      };
      const response = await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(complaint),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit complaint.\nKindly fill all fields!');
      }
      const json = await response.json();
  
      setEmail("");
      setDate("");
      setIssue("");
      setDepartment("");
      setTimeIn("");
      setTimeOut("");
      setOutcome("");
      setMIS_Officer("");
      setConfirmationOfficer("");
      setCategory("");
      toast.success("Complaint Added!");
      clearFormFields();
      console.log("Added ", json);
    } catch (err) {
      setError(err.message); 
      toast.error(error);
    }
  };




  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Form className="form" id="form" onSubmit={handleSubmit}>
          <ToastContainer/>
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
                <option value={"Pending"}>Pending</option>
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
          <Label for="category">Category</Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categoryOptions.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>{categoryOption}</option>
            ))}
          </Input>
        </FormGroup>
        <Button>Submit</Button>

      </Form>
    </div>
  )
}

export default NewComplaint