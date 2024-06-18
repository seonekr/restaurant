import "./editEmplotee.css";
import React, { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoKeySharp } from "react-icons/io5";
import AdminMenu from "../ownerMenu/OwnerMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditEmployee = () => {
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    password2: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API + `/restaurants/${storage.restaurant_id}/employees/list/`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your update logic here

    const FormData = require("form-data");
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("address", address);
    data.append("phone", phone);
    data.append("password", password);
    data.append("password2", password2);
    data.append("role", role);

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API +  `/restaurants/${storage.restaurant_id}/employees/${id}/update/`,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setEmployee(response.data)
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee updated successfully!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update employee data. Please try again later.",
        });
      });
  };

  return (
    <>
      <AdminMenu />
      <section id="addAmins">
        <div className="box_addAdmin">
          <form onSubmit={handleSubmit}>
            <div className="addAdminForm">
              <div className="boxhead_subminandtitle">
                <h2 className="titleaddmin">Edit Employee</h2>
                <div className="button-updateemp">
                  <button type="submit" className="btn_submit22">
                    Update
                  </button>
                </div>
              </div>

              {/* <div className="add-box">
                <label htmlFor="fname" className="titlelabel">
                  Name:
                </label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    type="fname"
                    id="fname"
                    className="input"
                    placeholder="Name..."
                    value={employee.name}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">
                  Email:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Email address..."
                    value={employee.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <div className="add-box">
                <label htmlFor="address" className="titlelabel">
                  Address:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="address"
                    id="address"
                    className="input"
                    placeholder="Address..."
                    value={employee.address}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
              {/* <div className="add-box">
                <label htmlFor="phone" className="titlelabel">
                  Phone number:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="phone"
                    id="phone"
                    className="input"
                    placeholder="Phone number..."
                    value={employee.phone}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <input
                    type="password"
                    id="password"
                    className="input"
                    placeholder="Password..."
                    value={employee.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Confirm password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <input
                    type="password2"
                    id="password2"
                    className="input"
                    placeholder="Confirm password..."
                    value={employee.password2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="role" className="titlelabel">
                  Role:
                </label>
                <div className="boxiconnandinput">
                  <IoKeySharp className="iconinput" />
                  <select
                    name="role"
                    className="input"
                    value={employee.role}
                    onChange={handleChange}
                  >
                    <option value="">Select role</option>
                    <option value="counter">Counter</option>
                    <option value="waiter">Waiter</option>
                  </select>
                </div>
              </div>
              {/* <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">
                  Profile image:
                </label>
                <div className="boxiconnandinput">
                  <CiImageOn className="iconinput" />
                  <input type="file" className="input" />
                </div>
              </div> */}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditEmployee;
