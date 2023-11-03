let employees = [];

document.getElementById('addEmployeeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const id = document.getElementById('id').value;
  const lastName = document.getElementById('lastName').value;
  const firstName = document.getElementById('firstName').value;
  const age = parseInt(document.getElementById('age').value);
  const department = document.getElementById('department').value;
  const nameRegex = /^[A-Za-z]+$/;

  // Input field validations
  if (id.length !== 6 || !/^[A-Za-z0-9]+$/.test(id)) {
    alert("ID should have exactly 6 characters and can only include numbers and letters.");
    return;
  }
  else if (!nameRegex.test(lastName) || !nameRegex.test(firstName) || lastName.length < 2 || lastName.length > 14 || firstName.length < 2 || firstName.length > 14) {
    alert("Your name should not contain numbers and it should have 2-14 characters.");
    return;
  }
  else if (age < 18 || age > 60) {
    alert("Age should be from 18-60");
    return;
  }
  else if (!addEmployee(id, lastName, firstName, age, department)) {
    alert('Employee ID already exists!');
  }
  else {
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
