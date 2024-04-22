import React, { useEffect, useState } from "react";
import { Table, Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComplaintDetails from "../../components/ComplaintDetails";
import apiConfig from "../../apiConfig.mjs";



const UnResolvedComplaints = () => {
  useEffect(() => {
    fetchComplaints();
  }, []);

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [modal, setModal] = useState(false);

  const fetchComplaints = async () => {
    try {
      // const url = "http://localhost:5000/api/complaints/get-complaints"
      const url = `${apiConfig.API_URL}/get-complaints`
      const response = await fetch(`${url}`);
      const json = await response.json();
      const resolvedComplaints =
        json.complaints.filter(
          (complaint) => complaint.outcome === "Not Resolved"
        ) || [];

      if (response.ok) {
        setComplaints(resolvedComplaints);
      }
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    }
  };

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    toggleModal();
  };

  const handleComplaintDelete = async (id) => {
    console.log("Deleting complaint with ID:", id);
    const url = `${apiConfig.API_URL}/remove-complaint/${id}`;

    try {
      const response = await fetch(`${url}`, {
        method: "DELETE",
      });
      const json = await response.json();

      if (response.ok) {
        setComplaints(complaints.filter((complaint) => complaint._id !== id));
        console.log("Complaint deleted successfully:", json.message);
        toast.success("Complaint Deleted");
        window.location.reload(true);
      } else {
        toast.error("Failed to delete complaint:");
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
      <div>
        <Card>
          <CardHeader tag={"h3"}>Unresolved Complaints</CardHeader>
          <CardBody>
            <Table striped hover>
              <thead className="text-primary">
                <tr>
                  <th>#</th>
                  <th>
                    Confirmation
                    <br />
                    Officer
                  </th>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Issue</th>
                  <th>Outcome</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, index) => (
                  <tr key={complaint._id}>
                    <td>{index + 1}</td>
                    <td>{complaint.confirmationOfficer}</td>
                    <td>{complaint.date}</td>
                    <td>{complaint.department}</td>
                    <td>
                      {complaint.issue.split(" ").slice(0, 5).join(" ")}{" "}
                      {complaint.issue.split(" ").length > 5 && "\n\n..."}
                    </td>
                    <td>{complaint.outcome}</td>

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
          </CardBody>
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
          <Button color="danger" onClick={handleCloseComplaintDetails}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UnResolvedComplaints;
