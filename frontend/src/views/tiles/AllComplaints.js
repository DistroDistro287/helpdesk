import React, { useEffect, useState } from "react";
import { Table, Button, Card, CardHeader, CardBody } from "reactstrap";
import Complaints from "../Complaints";

const AllComplaints = () => {
  // useEffect(() => {
  //   fetchComplaints();
  // }, []);

  // const [complaints, setComplaints] = useState([]);
  // const [selectedComplaint, setSelectedComplaint] = useState(null);
  // const [showUpdateForm, setShowUpdateForm] = useState(false);
  // const [modal, setModal] = useState(false);

  // const fetchComplaints = async () => {
  //   try {
  //     const url =
  //       "https://helpdesk-back.glitch.me/api/complaints/get-complaints";
  //     // const url = "http://localhost:5000/api/complaints/get-complaints"
  //     const response = await fetch(`${url}`);
  //     const json = await response.json();

  //     if (response.ok) {
  //       setComplaints(json.complaints);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch complaints:", error);
  //   }
  // };

  return (
    <>
      <Complaints />
    </>
  )



//   return (
//     <div>
//       <Card>
//         <CardHeader tag={"h3"}>
//           All Complaints
//         </CardHeader>
//         <CardBody>
//           <Table striped hover>
//             <thead className="text-primary">
//               <tr>
//                 <th>#</th>
//                 <th>
//                   Confirmation
//                   <br />
//                   Officer
//                 </th>
//                 <th>Date</th>
//                 <th>Department</th>
//                 <th>Issue</th>
//                 <th>Feedback</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {complaints.map((complaint, index) => (
//                 <tr key={complaint._id}>
//                   <td>{index + 1}</td>
//                   <td>{complaint.confirmationOfficer}</td>
//                   <td>{complaint.date}</td>
//                   <td>{complaint.department}</td>
//                   <td>
//                     {complaint.issue.split(" ").slice(0, 5).join(" ")}{" "}
//                     {complaint.issue.split(" ").length > 5 && "\n\n..."}
//                   </td>
//                   <td>{complaint.confirmationOfficerFeedback}</td>

//                   <td>
//                     <Button color="primary" size="sm">
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>
//     </div>
//   );
};

export default AllComplaints;
