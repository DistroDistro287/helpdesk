import React from 'react'
import { Card, CardHeader, CardBody, CardTitle, Table, Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col} from "reactstrap";


const ConfirmDelete = ({ handleComplaintDelete, complaint, toggle}) => {
    return (
        <div>
          <Card>
            <CardHeader>
            Do you want to remove this complaint?
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <Button 
                            color="danger"
                            onClick={() => handleComplaintDelete(complaint._id)}>
                            Yes
                        </Button>
                    </Col>
                <Col>
                    <Button 
                        color="primary"
                        onClick={() => toggle()}>
                        No
                    </Button>
                </Col>
                </Row>
            </CardBody>
          </Card>

    
        </div>
      );
}

export default ConfirmDelete