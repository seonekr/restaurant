import React, { useState } from "react";
import axios from "axios";
import "./addemployee.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/restaurant/employees/",
        formData
      );
      // Handle success, maybe show a success message or redirect
      console.log("Employee added successfully:", response.data);
    } catch (error) {
      // Handle error
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more fields as needed */}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
