import React, { useState, useEffect } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import userimage from "../../../img/userImage.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import Swal from "sweetalert2";
import "./employee.css";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const storage = JSON.parse(window.localStorage.getItem("user"));

  console.log("employee.id.....", employees);

  useEffect(() => {
    fetchEmployees();
  }, [storage.restaurant_id]);

  const fetchEmployees = () => {
    axios
      .get(
        `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/employees/list/`
      )
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleDelete = (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        fetch(
          `${import.meta.env.VITE_API}restaurants/${
            storage.restaurant_id
          }/employees/${employeeId}/delete/`,
          requestOptions
        )
          .then((response) => {
            if (response.ok) {
              Swal.fire("Deleted!", "Employee has been deleted.", "success");
              fetchEmployees(); // Refresh employee list after deletion
            } else {
              throw new Error("Failed to delete employee");
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the employee.",
              "error"
            );
            console.error("Error deleting employee:", error);
          });
      }
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
                {user.employee && (
                  <button
                    className="delete_storeDetails"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                )}

                <Link
                  to={`/edit_employee/${user.employee.id}`}
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
