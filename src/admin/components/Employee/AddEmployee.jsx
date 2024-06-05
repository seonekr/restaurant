import React, { useState } from "react";
import axios from "axios";
import "./addemployee.css";
import AdminMenu from "../ownerMenu/OwnerMenu";

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
    <>
      <AdminMenu />
      <section id="Employee">
        <div className="box_Employee">
          <div className="add-employee-containers">
            <h2>Add Employee</h2>
            <form className="add-employee-form" onSubmit={handleSubmit}>
              <div className="add-employee-form">
                <label htmlFor="name">Name:</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Name..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password..."
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="password2">Confirm password:</label>
                <input
                  type="password2"
                  id="password2"
                  name="password2"
                  placeholder="Confirm password..."
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="role">Role:</label>
                
                <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="counter">Counter</option>
                  <option value="waiter">Waiter</option>
                </select>
              </div>
              {/* Add more fields as needed */}
              <button type="submit">Add Employee</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEmployee;
