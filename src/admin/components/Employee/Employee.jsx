import React, { useState, useEffect } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import userimage from "../../../img/userImage.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import "./employee.css";
import AddEmployee from "./AddEmployee";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  console.log("employees....", employees)


  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/restaurants/1/employees/list/",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const handleDelete = (id) => {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/user/admin-users/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        alert("Admin user has been deleted.");
        setUsers(users.filter(user => user.employee.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <OwnerMenu />
      <div className="container_body_employee">
        <div className="container_box_employee">
          <div className="box_users">
            <h3>List Employee</h3>
            <div className="box_add_admin">
              <Link to="/add-employee" className="btn_addadmin">
                <BiPlus id="icon_add_admin" />
                Add Employee
              </Link>
            </div>
          </div>

          {employees.map((user, userIndex) => (
            <div key={userIndex} className="box_users_user">
              <div className="box_dp_txtandiamge">
                <div className="box_user_img">
                  <img src={user.employee.profile_image || userimage} alt="" />
                </div>
                <div className="box_user_text">
                  <p>{user.employee.nickname}</p>
                  <p>{user.employee.email}</p>
                </div>
              </div>
              <div className="btn_box_Cont">
                <button
                  className="delete_storeDetails"
                  onClick={() => {
                    handleDelete(user.employee.id);
                  }}
                >
                  Delete
                </button>
                <Link
                  to="/edit_employee"
                  className="viewMore_storeDetails"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Employee;
