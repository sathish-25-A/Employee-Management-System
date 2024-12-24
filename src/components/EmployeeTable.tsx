import { useState } from "react";
import { Employee } from "../types";
import './EmployeeTable.css'

interface Props {
  employees: Employee[];
  onDelete: (id: number) => void;
  onEdit: (employee: Employee) => void;
}

const EmployeeTable = ({ employees, onDelete, onEdit }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Employee | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Filter and sort employees
  const filteredEmployees = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((employee) =>
      selectedDepartment ? employee.department === selectedDepartment : true
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    });

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const uniqueDepartments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            fontSize: "14px",
          }}
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{ padding: "8px", fontSize: "14px" }}
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("department")}>
              Department{" "}
              {sortField === "department" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("position")}>
              Position{" "}
              {sortField === "position" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>
                <button onClick={() => onEdit(employee)}>Edit</button>
                <button onClick={() => onDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
