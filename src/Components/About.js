import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
class About extends Component {
  render() {
    return (
      <>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
          <Card.Title>Card Title about</Card.Title>
      <Card.Text>
          GG
      </Card.Text>
    <Button variant="primary">Go somewhere</Button>
    </Card.Body>
    <Card.Body>
          <Card.Title>Card Title about</Card.Title>
      <Card.Text>
          GG
      </Card.Text>
    <Button variant="primary">Go somewhere</Button>
    </Card.Body>
    
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title about</Card.Title>
            <Card.Text>
               GG
            </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
   </>
    );
  }
}

export default About;