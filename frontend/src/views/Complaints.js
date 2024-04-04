import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ComplaintDetails from "../components/ComplaintDetails";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
          // const url = "https://helpdesk-back.glitch.me/api/complaints/get-complaints"
  const url = "http://localhost:5000/api/complaints/get-complaints"
        const response = await fetch(`${url}`);
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

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    toggleModal();
  };

  const handleComplaintDelete = async (id) => {
    console.log('Deleting complaint with ID:', id);

    try {
      const response = await fetch(`https://helpdesk-back.glitch.me/api/complaints/remove-complaint/${id}`, {
        method: 'DELETE'
      });
      const json = await response.json();

      if (response.ok) {
        setComplaints(complaints.filter(complaint => complaint._id !== id));
        console.log("Complaint deleted successfully:", json.message);
        alert("Complaint Deleted");
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



  const handleCloseComplaintDetails = () => {
    setSelectedComplaint(null);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Complaints</CardTitle>
          </CardHeader>
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
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={complaint._id}>
                  <td>{index + 1}</td>
                  <td>{complaint.date}</td>
                  <td>{complaint.issue}</td>
                  <td>{complaint.department}</td>
                  <td>{complaint.timeIn}</td>
                  <td>{complaint.timeOut}</td>
                  <td>{complaint.outcome}</td>
                  <td>{complaint.MIS_Officer}</td>
                  <td>{complaint.confirmationOfficer}</td>
                  <td>{complaint.confirmationOfficerFeedback}</td>
                  <td>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => handleViewComplaint(complaint)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Complaint Details</ModalHeader>
        <ModalBody>
          <ComplaintDetails 
            complaint={selectedComplaint}  
            handleComplaintUpdate={handleComplaintUpdate}
            handleComplaintDelete={handleComplaintDelete}
            showUpdateForm={showUpdateForm}
            />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleCloseComplaintDetails}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Complaints;
