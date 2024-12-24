import React, { useState, useEffect } from "react";
import { Employee, EmployeeFormData } from "../types"; // Ensure proper imports

interface Props {
  employee?: Employee; // Employee prop should be passed from the parent component
  onEdit: (id: number, data: EmployeeFormData) => void; // Callback for editing employee
}

const EditEmployeeForm = ({ employee, onEdit }: Props) => {
  // Initial form data state with empty fields
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    department: "",
    position: "",
  });

  // When employee data is provided or changes, set the form data to prefill
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        department: employee.department,
        position: employee.position,
      });
    }
  }, [employee]); // Dependency on employee prop ensures form is updated when employee changes

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      onEdit(employee.id, formData); // Pass the updated data back to the parent component
    }
  };

  // If no employee is provided, don't render the form
  if (!employee) return null;

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h2>Edit Employee</h2>
      
      {/* Name field */}
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      
      {/* Department field */}
      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
      />
      
      {/* Position field */}
      <input
        type="text"
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      />
      
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditEmployeeForm;
