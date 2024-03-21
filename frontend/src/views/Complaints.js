// import React, { useEffect, useState } from "react";
// // react plugin for creating notifications over the dashboard
// import NotificationAlert from "react-notification-alert";
// // reactstrap components
// import {
//   Card,  CardHeader,  CardBody,  CardTitle,  Row,  Col,  Table, Badge} from "reactstrap";

//   import { Link } from "react-router-dom";



// // const { email, date, issue, department, timeIn, timeOut, outcome, MIS_Officer, confirmationOfficer} = req.body;

// function Complaints() {

// const [complaints, setComplaints] = useState([])


// useEffect(() => {
//     const fetchComplaints = async () => {
//         const response = await fetch('http://localhost:5000/api/complaints/get-complaints')
//         const json = await response.json();


//         // if (response.ok) {
//         //     const formattedComplaints = json.complaints.map(complaint => ({
//         //       ...complaint,
//         //       timeIn: formatTime(complaint.timeIn),
//         //       timeOut: formatTime(complaint.timeOut)
//         //     }));
//         //     setComplaints(formattedComplaints);
//         //     console.log('Response is ', formattedComplaints);
//         //   }


//         if (response.ok) {
//             setComplaints(json.complaints)
//             console.log('Response is ', json.complaints)
//         }
//     }

//     fetchComplaints()
// }, [])

// const formatTime = timeString => {
//     const time = new Date(timeString);
//     // Format time as HH:mm AM/PM
//     return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
//   };


//   const handleComplaintDelete = async(id) => {
//     console.log('Deleting complaint with ID:', id);

//     try {
//       const response = await fetch(`http://localhost:5000/api/complaints/remove-complaint/${id}`, {
//         method: 'DELETE'
//       });
//       const json = await response.json();

//       if (response.ok) {
//         // Filter out the deleted complaint from the complaints array
//         setComplaints(complaints.filter(complaint => complaint._id !== id));
//         console.log("Complaint deleted successfully:", json.message);
//       } else {
//         console.error("Failed to delete complaint:", json.error);
//       }
//     } catch (error) {
//       console.error("Error deleting complaint:", error);
//     }

//   };

//   return (
//     <>
//       <div className="content">
//         {/* <NotificationAlert ref={notificationAlert} /> */}
//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>
//                 <CardTitle tag="h5">Complaints</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Table striped="false" hover="true">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Date</th>
//                         <th>Detailed<br/>Issue</th>
//                         <th>Department</th>
//                         <th>Time<br/>In</th>
//                         <th>Time<br/>Out</th>
//                         <th>Outcome</th>
//                         <th> MIS<br/>Officer</th>
//                         <th>Confirmation<br/>Officer</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {complaints.map((complaint, index) => (
//                         <tr id={complaint._id} key={complaint._id}>
//                         <th scope="row">{index + 1}</th>
//                         <td className="date">{complaint.date}</td>
//                         <td className="issue">{complaint.issue}</td>
//                         <td className="Department">{complaint.department}</td>
//                         <td className="time-in">{complaint.timeIn}</td>
//                         <td className="time-out">{complaint.timeOut}</td>
//                         <td className="outcome">{complaint.outcome}</td>
//                         <td className="mis-officer">{complaint.MIS_Officer}</td>
//                         <td className="confirmation-officer">{complaint.confirmationOfficer}</td>
//                         <td>
//                           <Link
//                             to={`/update-complaint/${complaint._id}`}
//                             className="btn btn-info"
//                           >
//                             Update
//                           </Link>
//                         </td>
//                         <td className="delete">
//                         <Badge color="danger" pill>
//                             <span 
//                             style={{cursor: 'pointer'}}
//                               className="delete pointer" 
//                               onClick={() => handleComplaintDelete(complaint._id)}>X
//                             </span>
//                         </Badge>
//                         </td>
//                         </tr>
//                     ))}
//                 </tbody>

//                 </Table>
//             </CardBody>
//             </Card>
//             </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default Complaints;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Badge,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/complaints/get-complaints"
        );
        const json = await response.json();

        if (response.ok) {
          setComplaints(json.complaints);
        }
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleComplaintDelete = async (id) => {
    console.log('Deleting complaint with ID:', id);

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/remove-complaint/${id}`, {
        method: 'DELETE'
      });
      const json = await response.json();

      if (response.ok) {
        // Filter out the deleted complaint from the complaints array
        setComplaints(complaints.filter(complaint => complaint._id !== id));
        console.log("Complaint deleted successfully:", json.message);
      } else {
        console.error("Failed to delete complaint:", json.error);
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const handleComplaintUpdate = (complaint) => {
    setSelectedComplaint(complaint);
    setShowUpdateForm(true);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Complaints</CardTitle>
              </CardHeader>
              <CardBody>
                <Table striped hover>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Detailed<br />Issue</th>
                      <th>Department</th>
                      <th>Time<br />In</th>
                      <th>Time<br />Out</th>
                      <th>Outcome</th>
                      <th>MIS<br />Officer</th>
                      <th>Confirmation<br />Officer</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint, index) => (
                      <React.Fragment key={complaint._id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{complaint.date}</td>
                          <td>{complaint.issue}</td>
                          <td>{complaint.department}</td>
                          <td>{complaint.timeIn}</td>
                          <td>{complaint.timeOut}</td>
                          <td>{complaint.outcome}</td>
                          <td>{complaint.MIS_Officer}</td>
                          <td>{complaint.confirmationOfficer}</td>
                          <td>
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => handleComplaintUpdate(complaint)}
                            >
                              Update
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleComplaintDelete(complaint._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                        {selectedComplaint === complaint && showUpdateForm && (
                          <tr>
                            <td colSpan="10">
                              <UpdateForm complaint={selectedComplaint} />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

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
  // Add state variables for other fields

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
      }else {
        console.error("Failed to update complaint:", json.error);
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
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
      <Button type="submit">Update</Button>
    </Form>
  );
};

export default Complaints;
