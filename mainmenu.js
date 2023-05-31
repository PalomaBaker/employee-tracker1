const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host:"127.0.0.1",
  user: 'root',
  password: 'ilovemyfamily',
  database: 'company_info',
});