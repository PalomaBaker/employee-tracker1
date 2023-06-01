const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const fs = require('fs');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ilovemyfamily',
    database: 'company_info',
  });
  
  fs.readFile('seeds.sql', 'utf8', (error, data) => {
    if (error) {
      console.error('Error reading seeds.sql file:', error);
      return;
    }
  
    connection.query(data, (error, results) => {
      if (error) {
        console.error('Error executing seeds.sql:', error);
      } else {
        console.log('seeds.sql executed successfully.');
      }
      showMainMenu();
    });
  });
  
  function handleMenuOption(option) {
    switch (option) {
      case 'View all departments':
        getAllDepartments();
        break;
      case 'View all roles':
        getAllRoles();
        break;
      case 'View all employees':
        getAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
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
    const query = 'SELECT * FROM departments';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving departments:', error);
      } else {
        console.table(results);
      }
      showMainMenu();
    });
  }
  
  function addDepartment() {
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
            console.error('Error adding department:', error);
          } else {
            console.log('Department added successfully.');
          }
          showMainMenu();
        });
      });
  }
  
  function getAllRoles() {
    const query = 'SELECT * FROM roles';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving roles:', error);
      } else {
        console.table(results);
      }
      showMainMenu();
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
          name: 'department_id',
          message: 'Enter the department ID for the role:',
        },
      ])
      .then((answers) => {
        const { roleName, salary, department_id } = answers;
  
        const query =
          'INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?)';
        const values = [roleName, salary, department_id];
  
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error('Error adding role:', error);
          } else {
            console.log('Role added successfully.');
          }
          showMainMenu();
        });
      });
  }
  
  function getAllEmployees() {
    const query = 'SELECT * FROM employees';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving employees:', error);
      } else {
        console.table(results);
      }
      showMainMenu();
    });
  }
  
  function addEmployee() {
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
            console.error('Error adding employee:', error);
          } else {
            console.log('Employee added successfully.');
          }
          showMainMenu();
        });
      });
  }
  
  function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employee_id',
          message: "Enter the ID of the employee to update:",
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: "Enter the new role ID for the employee:",
        },
      ])
      .then((answers) => {
        const { employee_id, newRoleId } = answers;
  
        const query =
          'UPDATE employees SET role_id = ? WHERE employee_id = ?';
        const values = [newRoleId, employee_id];
  
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error('Error updating employee role:', error);
          } else {
            console.log('Employee role updated successfully.');
          }
          showMainMenu();
        });
      });
  }
  
  function showMainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'option',
          message: 'Select an option:',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        handleMenuOption(answers.option);
      });
  }
  
  showMainMenu();
  