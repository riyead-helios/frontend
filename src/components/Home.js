import React, { useState, useEffect } from "react";

import UpdateEmployeeModel from "./UpdateEmployeeModel";
import {
  getEmployees,
  deleteEmployee,
  addEmployee,
} from "../services/EmployeeService";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editEmployee, setEditEmployee] = useState([]);

  // render home component when first time it's mounte & when isUpdated & employees are changed
  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data);
    });
  }, [isUpdated, employees]);

  // handle delete request
  const handleDelete = (e, employeeId) => {
    e.preventDefault();

    if (window.confirm("Are you sure ?")) {
      // delete data through api calling by EmployeeServie.js
      deleteEmployee(employeeId).then(
        (result) => {
          alert(result);
          setIsUpdated(true);
        },
        (error) => {
          alert("Failed to Delete Employee");
        }
      );
    }
  };

  // add employee state
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle when from input value changed
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  // handle add functionalities
  const handleAddEmployee = (e) => {
    e.preventDefault();

    // call api for adding to the backend from EmployeeService.js
    addEmployee(newEmployee)
      .then((response) => {
        // Append the new employee to the existing employees array
        setEmployees([...employees, response]);

        alert("Employee added successfully!");
        setIsUpdated(true); // Trigger data update by setting 'isUpdated' to true

        // Reset the form fields, when data is submited
        setNewEmployee({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        alert("Failed to Add Employee");
        console.error(error);
      });
  };

  //handle data update
  const handleUpdate = (e, emp) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditEmployee(emp);
  };

  let AddModelClose = () => setAddModalShow(false);
  let EditModelClose = () => setEditModalShow(false);

  return (
    <div className="container-fluid">
      <h2
        className="text-center bg-success mt-4 mb-4"
        style={{ height: "50px" }}
      >
        Employees List
      </h2>

      {/* form to adding data */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleAddEmployee}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="form-control mt-2 mb-2"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className="form-control mt-2 mb-2"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                  className="form-control mt-2 mb-2"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-5"
                style={{ width: "100%" }}
              >
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>



      {/* show data */}
      <table className="table table-dark table-bordered table-striped">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th> {/* Add a new column for buttons */}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id} className="text-center">
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.password}</td>
              <td>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                  onClick={(event) => handleUpdate(event, emp)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(event) => handleDelete(event, emp.employeeId)}
                >
                  Delete
                </button>
                <UpdateEmployeeModel
                  show={editModalShow}
                  employee={editEmployee}
                  setUpdated={setIsUpdated}
                  onHide={EditModelClose}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
