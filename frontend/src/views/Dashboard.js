import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "../variables/charts.js";
import AllComplaints from "./tiles/AllComplaints";
import Complaints from "./Complaints";






function Dashboard() {
  
  // useEffect(() => {
  //   fetchComplaints();
  // }, []);
  
  // const [complaints, setComplaints] = useState([]);

  // const fetchComplaints = async () => {
  //   try {
  //       const url = "https://helpdesk-back.glitch.me/api/complaints/get-complaints"
  // // const url = "http://localhost:5000/api/complaints/get-complaints"
  //     const response = await fetch(`${url}`);
  //     const json = await response.json();
  
  //     if (response.ok) {
  //       setComplaints(json.complaints);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch complaints:", error);
  //   }
  // };
  const navigate = useNavigate();


  const handleAllComplaintsClick = () => {
    navigate("/admin/all-complaints");
  };

  const handleResolvedComplaintsClick = () => {
    navigate("/admin/resolved-complaints");
  };

  const handleUnResolvedComplaintsClick = () => {
    navigate("/admin/unresolved-complaints");
  };

  const handlePendingComplaints = () => {
    navigate("/admin/pending-complaints");
  };

  const handleCategorySoftware = () => {
    navigate("/admin/category/software");
  };

  const handleCategoryHardware = () => {
    navigate("/admin/category/hardware");
  };

  const handleCategoryNetwork = () => {
    navigate("/admin/category/network");
  };



  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="12" xs="7" onClick={handleAllComplaintsClick}  style={{cursor: "pointer"}}>
                      <div className="numbers">
                        <p className="card-category">View Complaints</p>
                        <CardTitle tag="small">ALL COMPLAINTS</CardTitle>
                        <p />
                      </div>
                  </Col>  
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  {/* <i className="fas fa-sync-alt" /> Update Now */}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  {/* <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col> */}
                  <Col md="12" xs="7" onClick={handleResolvedComplaintsClick} style={{cursor: "pointer"}}>  
                    <div className="numbers">
                      <p className="card-category">View Resolved Complaints</p>
                      <CardTitle tag="small">RESOLVED</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  {/* <i className="far fa-calendar" /> Last day */}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  {/* <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col> */}
                  <Col md="12" xs="7" onClick={handleUnResolvedComplaintsClick} style={{cursor: "pointer"}}>
                    <div className="numbers">
                      <p className="card-category">
                        View Unresolved Complaints
                      </p>
                      <CardTitle tag="small">UNRESOLVED</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  {/* <i className="far fa-clock" /> In the last hour */}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  {/* <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col> */}
                  <Col md="12" xs="7" onClick={handlePendingComplaints}  style={{cursor: "pointer"}}>
                    <div className="numbers">
                      <p className="card-category">
                        View Pending Complaints
                      </p>
                      <CardTitle tag="small">PENDING</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  {/* <i className="far fa-clock" /> In the last hour */}
                </div>
              </CardFooter>
            </Card>
          </Col>
          {/* <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col> */}
        </Row>

        {/* categories */}

        <Row>
          <Col className="align-items-center align-middle my-autoo">
            <Card className="bg-warningg">
              <CardHeader>
                <CardTitle tag="h3" className="font-weight-bold">
                  CATEGORIES
                  {/* <small className="text-light"> View Complaint Categories</small> */}
                </CardTitle>
              </CardHeader>
              <CardBody></CardBody>
              <Row  className="justify-content-center">
                <Col lg="3" md="6" sm="6">
                  <Card className="card-stats bg-dark text-white">
                    <CardBody>
                      <Row>
                        <Col md="12" xs="7" onClick={handleCategorySoftware} style={{cursor: "pointer"}}>
                          <div className="numbers">
                            <p className="card-category text-light">
                              Software Issues
                            </p>
                            <CardTitle tag="small" className="text-warning text-center">
                              Software
                            </CardTitle>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        {/* <i className="fas fa-sync-alt" /> Update Now */}
                      </div>
                    </CardFooter>
                  </Card>
                </Col>

                <Col lg="3" md="6" sm="6">
                  <Card className="card-stats bg-dark text-white">
                    <CardBody>
                      <Row>
                        <Col md="12" xs="7" onClick={handleCategoryNetwork} style={{cursor: "pointer"}}>
                          <div className="numbers">
                            <p className="card-category text-light">
                              Internet Issues
                            </p>
                            <CardTitle tag="small" className="text-warning">
                              Network
                            </CardTitle>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        {/* <i className="fas fa-sync-alt" /> Update Now */}
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                  <Card className="card-stats bg-dark text-white">
                    <CardBody>
                      <Row>
                        <Col md="12" xs="7" onClick={handleCategoryHardware} style={{cursor: "pointer"}}>
                          <div className="numbers">
                            <p className="card-category text-light">
                              Hardware Issues
                            </p>
                            <CardTitle tag="small" className="text-warning">
                              Hardware
                            </CardTitle>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        {/* <i className="fas fa-sync-alt" /> Update Now */}
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <CardFooter>
                <hr />
                <div className="stats">
                  {/* <i className="fa fa-history" /> Updated 3 minutes ago */}
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
