let employees = [];

document.getElementById('addEmployeeTable').addEventListener('submit', function(event) {
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
  if (employees.find(employee => employee.id === id)) {
    alert("This ID is already taken");
    return;
  }
  if (!nameRegex.test(lastName) || !nameRegex.test(firstName) || lastName.length < 2 || lastName.length > 14 || firstName.length < 2 || firstName.length > 14) {
    alert("Your name should not contain numbers and it should have 2-14 characters.");
    return;
  }
  if (age < 18 || age > 60) {
    alert("Age should be from 18-60");
    return;
  }

  // Add the employee to the employees array
  employees.push({ id, lastName, firstName, age, department });

  // Clear the form
  document.getElementById('addEmployeeTable').reset();

  // Update the Employee table
  updateEmployeeTable();
});

function updateEmployeeTable() {
  const employeeTable = document.getElementById('employeeTable');
  // Clear existing table rows
  employeeTable.innerHTML = `
    <tr>
      <th>Employee ID</th>
      <th>Last Name</th>
      <th>First Name</th>
      <th>Age</th>
      <th>Department</th>
      <th>Action</th>
    </tr>
  `;

  // Populate the table with employee data
  employees.forEach((employee, index) => {
    const newRow = employeeTable.insertRow(index + 1);

    const cellId = newRow.insertCell(0);
    cellId.textContent = employee.id;

    const cellLastName = newRow.insertCell(1);
    cellLastName.textContent = employee.lastName;

    const cellFirstName = newRow.insertCell(2);
    cellFirstName.textContent = employee.firstName;

    const cellAge = newRow.insertCell(3);
    cellAge.textContent = employee.age;

    const cellDepartment = newRow.insertCell(4);
    cellDepartment.textContent = employee.department;

    const cellAction = newRow.insertCell(5);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => confirmDeleteEmployee(index));
    cellAction.appendChild(deleteButton);
  });
}

function confirmDeleteEmployee(index) {
  if (confirm("Are you sure you want to remove this employee?")) {
    employees.splice(index, 1);
    updateEmployeeTable();
  }
}


updateEmployeeTable();
