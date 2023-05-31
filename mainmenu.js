const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host:"127.0.0.1",
  user: 'root',
  password: 'ilovemyfamily',
  database: 'company_info',
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