let employees = [];

document.getElementById('addEmployeeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const lastName = document.getElementById('lastName').value;
  const firstName = document.getElementById('firstName').value;
  const age = document.getElementById('age').value;
  const department = document.getElementById('department').value;
  const nameRegex = /^[A-Za-z]+$/;
  if (id.length !== 6) {
    alert('ID must be a number with 6 digits!');
  } else if (!lastName.match(nameRegex) || !firstName.match(nameRegex)) {
    alert('First name and last name must only contain alphabets!');
  } else if (age < 18) {
    alert('Age must be 18 or above!');
  } else if (!addEmployee(id, lastName, firstName, age, department)) {
    alert('Employee ID already exists!');
  } else {
    displayEmployees();
    //Clear the form fields
    document.getElementById('id').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('department').value = 'IT';
  }
});



function addEmployee(id, lastName, firstName, age, department) {
  if (employees.some(employee => employee.id === id)) {
    return false;
  }
  const employee = { id, lastName, firstName, age, department };
  employees.push(employee);
  return true;
}

function removeEmployee(id) {
  if (confirm('Are you sure you want to remove this employee?')) {
    employees = employees.filter(employee => employee.id !== id);
    displayEmployees();
  }
}

function displayEmployees() {
  const table = document.getElementById('employeeTable');
  table.innerHTML = '<tr><th>Employee ID</th><th>Last Name</th><th>First Name</th><th>Age</th><th>Department</th><th>Action</th></tr>';
  for (const employee of employees) {
    const row = `<tr><td>${employee.id}</td><td>${employee.lastName}</td><td>${employee.firstName}</td><td>${employee.age}</td><td>${employee.department}</td><td><button onclick="removeEmployee('${employee.id}')">Remove Now</button></td></tr>`;
    table.innerHTML += row;
  }
}