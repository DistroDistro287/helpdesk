import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const ConfirmationCard = ({ message }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <CardBody>
        <CardTitle tag="h5">Confirmation</CardTitle>
      </CardBody>
      <CardBody>
        <CardText>{message}</CardText>
      </CardBody>
    </Card>
  );
};

export default ConfirmationCard;
