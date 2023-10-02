import axios from 'axios';

export function getEmployees() {
  return axios.get('http://127.0.0.1:8000/employees/')
    .then(response => response.data)
}

export function deleteEmployee(employeeId) {
  return axios.delete('http://127.0.0.1:8000/employees/' + employeeId + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}

export function addEmployee(newEmployeeData){
  console.log(newEmployeeData)
  return axios.post('http://127.0.0.1:8000/employees/', {
    employeeId:null,
    name:newEmployeeData.name,
    email:newEmployeeData.email,
    password:newEmployeeData.password,
  })
    .then(response=>response.data)
    
}

export function updateEmployee(employeeId, employee) {
  console.log(employee);
  return axios.put('http://127.0.0.1:8000/employees/' + employeeId + '/', {
    
    name:employee.name,
    email:employee.email,
    password:employee.password,
  })
   .then(response => response.data)
}



