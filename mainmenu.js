const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host:"127.0.0.1",
  user: 'root',
  password: 'ilovemyfamily',
  database: 'company_info',
});

connection.connect(function (err) {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      // Optionally, display a message to the user or terminate the application
    } else {
      console.log('Connected to MySQL server');
      showMainMenu();
    }
  });

function handleMenuOption(option) {
    switch (option) {
      case 'View all departments':
        getAllDepartments()
          .then((departments) => {
            console.table(departments);
          })
          .catch((error) => {
            console.error('Error retrieving departments:', error);
          })
          .finally(() => {
            showMainMenu();
          });
        break;
      case 'View all roles':
        getAllRoles()
          .then((roles) => {
            // Format and display the roles
            console.log('Job Title\tRole ID\tDepartment\tSalary');
            roles.forEach((role) => {
              console.log(
                `${role.title}\t${role.role_id}\t${role.department}\t${role.salary}`
              );
            });
          })
          .catch((error) => {
            console.error('Error retrieving roles:', error);
          })
          .finally(() => {
            showMainMenu();
          });
        break;
      case 'View all employees':
        getAllEmployees()
          .then((employees) => {
            // Format and display the employees
            console.log(
              'Employee ID\tFirst Name\tLast Name\tJob Title\tDepartment\tSalary\tManager'
            );
            employees.forEach((employee) => {
              console.log(
                `${employee.employee_id}\t${employee.first_name}\t${employee.last_name}\t${employee.job_title}\t${employee.department}\t${employee.salary}\t${employee.manager}`
              );
            });
          })
          .catch((error) => {
            console.error('Error retrieving employees:', error);
          })
          .finally(() => {
            showMainMenu();
          });
        break;
      case 'Add a department':
        addDepartment()
          .then(() => {
            showMainMenu();
          })
          .catch((error) => {
            console.error('Error adding department:', error);
            showMainMenu();
          });
        break;
      case 'Add a role':
        addRole()
          .then(() => {
            showMainMenu();
          })
          .catch((error) => {
            console.error('Error adding role:', error);
            showMainMenu();
          });
        break;
      case 'Add an employee':
        addEmployee()
          .then(() => {
            showMainMenu();
          })
          .catch((error) => {
            console.error('Error adding employee:', error);
            showMainMenu();
          });
        break;
      case 'Update an employee role':
        updateEmployeeRole()
          .then(() => {
            showMainMenu();
          })
          .catch((error) => {
            console.error('Error updating employee role:', error);
            showMainMenu();
          });
        break;
      case 'Exit':
        connection.end((err) => {
          if (err) {
            console.error('Error closing the database connection:', err);
          } else {
            console.log('Database connection closed.');
          }
          process.exit(); // Terminate the application
        });
        break;
    }
  }

  function getAllDepartments() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM departments';
  
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

function addDepartment() {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:',
          },
        ])
        .then((answers) => {
          const { departmentName } = answers;
  
          const query = 'INSERT INTO departments (department_name) VALUES (?)';
          const values = [departmentName];
  
          connection.query(query, values, (error, results) => {
            if (error) {
              reject(error);
            } else {
              console.log('Department added successfully.');
              resolve();
            }
          });
        });
    });
  }

function getAllRoles() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM roles';
  
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleName',
          message: 'Enter the name of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:',
        },
      ])
      .then((answers) => {
        const { roleName, salary, departmentId } = answers;
  
        const query =
          'INSERT INTO roles (name, salary, department_id) VALUES (?, ?, ?)';
        const values = [roleName, salary, departmentId];
  
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error('Error adding role:', error);
          } else {
            console.log('Role added successfully.');
          }
        });
      });
  }
  
  
function getAllEmployees() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM employees';
  
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
function addEmployee() {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "Enter the employee's first name:",
          },
          {
            type: 'input',
            name: 'lastName',
            message: "Enter the employee's last name:",
          },
          {
            type: 'input',
            name: 'roleId',
            message: "Enter the employee's role ID:",
          },
          {
            type: 'input',
            name: 'managerId',
            message: "Enter the employee's manager ID:",
          },
        ])
        .then((answers) => {
          const { firstName, lastName, roleId, managerId } = answers;
  
          const query =
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
          const values = [firstName, lastName, roleId, managerId];
  
          connection.query(query, values, (error, results) => {
            if (error) {
              reject(error);
            } else {
              console.log('Employee added successfully.');
              resolve();
            }
          });
        });
    });
  }
  
function updateEmployeeRole() {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'employeeId',
            message: "Enter the ID of the employee to update:",
          },
          {
            type: 'input',
            name: 'newRoleId',
            message: "Enter the new role ID for the employee:",
          },
        ])
        .then((answers) => {
          const { employeeId, newRoleId } = answers;
  
          const query =
            'UPDATE employees SET role_id = ? WHERE employee_id = ?';
          const values = [newRoleId, employeeId];
  
          connection.query(query, values, (error, results) => {
            if (error) {
              reject(error);
            } else {
              console.log('Employee role updated successfully.');
              resolve();
            }
          });
        });
    });
  }
  