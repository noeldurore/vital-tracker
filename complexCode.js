/*
   filename: complexCode.js
   content: This code demonstrates an advanced employee management system. It includes features such as adding, deleting, and searching employees, as well as generating statistics based on their performance.
*/

class Employee {
  constructor(id, name, position, department, salary) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.department = department;
    this.salary = salary;
  }
}

class EmployeeManagementSystem {
  constructor() {
    this.employeeList = [];
  }

  addEmployee(id, name, position, department, salary) {
    const employee = new Employee(id, name, position, department, salary);
    this.employeeList.push(employee);
    console.log(`Employee ${name} added successfully.`);
  }

  deleteEmployee(id) {
    const index = this.employeeList.findIndex(emp => emp.id === id);
    if (index !== -1) {
      const deletedEmployee = this.employeeList.splice(index, 1)[0];
      console.log(
        `Employee ${deletedEmployee.name} with ID ${deletedEmployee.id} deleted successfully.`
      );
    } else {
      console.log(`Employee with ID ${id} not found.`);
    }
  }

  searchEmployee(name) {
    const filteredEmployees = this.employeeList.filter(
      emp => emp.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredEmployees.length > 0) {
      console.log(
        `Employees matching the name '${name}':\n`,
        filteredEmployees
      );
    } else {
      console.log(`No employees found with the name '${name}'.`);
    }
  }

  calculateAverageSalary() {
    const totalSalary = this.employeeList.reduce(
      (acc, emp) => acc + emp.salary,
      0
    );
    const averageSalary = totalSalary / this.employeeList.length;
    console.log(`Average Salary: ${averageSalary}`);
  }

  generateDepartmentStatistics() {
    const departments = {};
    this.employeeList.forEach(emp => {
      if (!departments[emp.department]) {
        departments[emp.department] = 1;
      } else {
        departments[emp.department]++;
      }
    });
    console.log(`Department Statistics:\n`, departments);
  }
}

// Usage examples:

const empManagementSystem = new EmployeeManagementSystem();

empManagementSystem.addEmployee(1001, "John Doe", "Software Engineer", "IT", 60000);
empManagementSystem.addEmployee(1002, "Jane Smith", "Sales Manager", "Sales", 80000);
empManagementSystem.addEmployee(1003, "Tom Johnson", "HR Specialist", "HR", 55000);
empManagementSystem.addEmployee(1004, "Amy Wilson", "Marketing Coordinator", "Marketing", 50000);

empManagementSystem.searchEmployee("john");
empManagementSystem.searchEmployee("Amy");
empManagementSystem.searchEmployee("David");

empManagementSystem.calculateAverageSalary();

empManagementSystem.deleteEmployee(1002);

empManagementSystem.generateDepartmentStatistics();
