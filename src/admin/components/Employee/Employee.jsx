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

  console.log("employee.id.....", employees)

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

<<<<<<< HEAD
  const handleDelete = (employeeId) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:8000/restaurants/${storage.restaurant_id}/employees/${employeeId}/delete/`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          console.log("Employee deleted successfully");
          fetchEmployees(); // Refresh employee list after deletion
        } else {
          throw new Error("Failed to delete employee");
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
=======
  const handleDelete = (employee) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: import.meta.env.VITE_API + `/restaurants/1
          }/employees/8/delete/`,
          headers: {
            "Content-Type": "application/json",
          },
        };

       

        axios
          .request(config)
          .then((response) => {
            Swal.fire(
              'Deleted!',
              'The employee has been deleted.',
              'success'
            );
            setEmployees((prevEmployees) =>
              prevEmployees.filter((emp) => emp.employee.id !== employee.id)
            );
            console.log("employee.id....", employee.id)
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'There was an issue deleting the employee.',
              'error'
            );
            console.log(error);
          });
      }
    });
>>>>>>> 930fb23411dfcf4cf8c6f447d48ab2c833703b0f
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
