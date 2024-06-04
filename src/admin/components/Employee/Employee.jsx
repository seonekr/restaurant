import React, { useState, useEffect } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import userimage from "../../../img/userImage.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import "./employee.css";
import AddEmployee from "./AddEmployee";

const Employee = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [users, set_users] = useState([]);

  useEffect(() => {
    let data = JSON.stringify({
      token: token,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/check-token",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.result != "success") {
          localStorage.clear();

          navigate("/loginuser");
          return;
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        navigate("/loginuser");
        return;
      });
  }, [token]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_users(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [users]);
console.log(users)
  const handleDelete = (id) => {
    let data = "";

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/user/admin-users/${id}`,
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert("Admin user has been deleted.");
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
          {users.length === 0 ? (
            <p className="no-reviews-message">No Order</p>
          ) : (
            users.map((user, index) => (
              <div key={user.id} className="box_users_user">
                <div className="box_dp_txtandiamge">
                  <div className="box_user_img">
                    <img src={user.profile_image || userimage} alt="" />
                  </div>
                  <div className="box_user_text">
                    <p>{user.nickname}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="btn_box_Cont">
                  <button
                    className="delete_storeDetails"
                    onClick={() => {
                      handleDelete(user.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit-admin/${user.id}`}
                    className="viewMore_storeDetails"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
     

    </>
  );
};

export default Employee;
