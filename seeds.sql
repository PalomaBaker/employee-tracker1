-- Insert departments
INSERT INTO departments (department_id, department_name) VALUES
  (1, 'Sales'),
  (2, 'Accounting'),
  (3, 'Human Resources');


-- Insert roles
INSERT INTO roles (role_id, role_title, salary, department_id) VALUES
  (10, 'Accountant 1', 50000, 1),
  (20, 'Sales Lead', 60000, 2),
  (30, 'HR Manager', 80000, 3);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id) VALUES
  ('John', 'Smith',10, 1, NULL),
  ('Jane', 'Doe',20, 2, NULL),
  ('Michael', 'Johnson',30, 3, NULL);
