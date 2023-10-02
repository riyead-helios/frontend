import React,{Component} from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import {
    updateEmployee
  } from "../services/EmployeeService";

const UpdateEmployeeModel= (props) => {
   
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
    // console.log(e.target)
    updateEmployee(props.employee.employeeId, updatedEmployee)
    .then((result)=>{
        alert(result);
        props.setUpdated(true);
    },
    (error)=>{
        alert("Failed to Update Student");
    })
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Employee Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  defaultValue={props.employee.name}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  required
                  defaultValue={props.employee.email}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  required
                  defaultValue={props.employee.password}
                  placeholder=""
                />
              </Form.Group>
              
              <Form.Group class="mt-2">
                <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                  Submit
                </Button>
               
                <Button variant="secondary" className="ml-2" onClick={props.onHide}>
                  Go Back
                </Button>
                
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEmployeeModel;
