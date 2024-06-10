import React, { useState } from "react";
import axios from "axios";
import "./addemployee.css";
import AdminMenu from "../ownerMenu/OwnerMenu";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    password2: "",
    role: "",
    // Add more fields as needed
  });

  console.log("formData...", formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      restaurant: 1,
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      role: formData.role,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/user/signup-employee`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setFormData(response.data)
        Swal.fire({
          icon: "success",
          text: "Add employee successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
                <label htmlFor="address">Address:</label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  placeholder="Address..."
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-form">
                <label htmlFor="phone">Phone number:</label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="Phone number..."
                  value={formData.phone}
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
                  value={formData.password2}
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
