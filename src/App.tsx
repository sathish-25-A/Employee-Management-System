import { useState } from "react";
import { Employee, EmployeeFormData } from "./types";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EditEmployeeForm from "./components/EditEmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(undefined);

  const addEmployee = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      id: Date.now(), // Using Date.now() to generate unique IDs
      ...data,
    };
    setEmployees([...employees, newEmployee]);
  };

  const editEmployee = (id: number, data: EmployeeFormData) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...data } : employee
      )
    );
    setEditingEmployee(undefined); // Clear the editing form after saving
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEditClick = (employee: Employee) => {
    if (editingEmployee?.id !== employee.id) {
      setEditingEmployee(employee);
    } else {
      setEditingEmployee(undefined); // Hide form if the same employee is clicked
    }
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <AddEmployeeForm onAdd={addEmployee} />
      {editingEmployee && (
        <EditEmployeeForm employee={editingEmployee} onEdit={editEmployee} />
      )}
      <EmployeeTable 
        employees={employees} 
        onDelete={deleteEmployee} 
        onEdit={handleEditClick} 
      />
    </div>
  );
};

export default App;
