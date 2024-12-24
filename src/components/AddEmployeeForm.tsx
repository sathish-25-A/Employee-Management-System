import React, { useState } from "react";
import { EmployeeFormData } from "../types";

interface Props {
  onAdd: (data: EmployeeFormData) => void;
}

const AddEmployeeForm = ({ onAdd }: Props) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    department: "",
    position: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate: Check if any field is empty
    if (!formData.name || !formData.department || !formData.position) {
      setError("All fields are required!");
      return;
    }

    // Clear error and submit
    setError("");
    onAdd(formData);
    setFormData({ name: "", department: "", position: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) =>
          setFormData({ ...formData, department: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Position"
        value={formData.position}
        onChange={(e) =>
          setFormData({ ...formData, position: e.target.value })
        }
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
