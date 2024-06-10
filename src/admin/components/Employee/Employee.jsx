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

  console.log("employees....", employees);

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
      url: import.meta.env.VITE_API + `/user/admin-users/${id}/delete/`, // corrected URL
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setUsers(users.filter((user) => user.employee.id !== id));
        Swal.fire(
          "Error!",
          "Admin user has been deleted.",
          "error"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleDelete = (category) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: `Do you want to delete ${category.name}?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`${import.meta.env.VITE_API}/restaurants/1/categories/${category.id}/delete/`, {
  //         method: "DELETE",
  //       }).then((response) => {
  //         if (response.ok) {
  //           // Remove the category from the state
  //           setCategories(categories.filter((cat) => cat.id !== category.id));
  //           Swal.fire(
  //             'Deleted!',
  //             `${category.name} has been deleted.`,
  //             'success'
  //           );
  //         } else {
  //           Swal.fire(
  //             'Error!',
  //             'There was a problem deleting the category.',
  //             'error'
  //           );
  //         }
  //       }).catch((error) => {
  //         Swal.fire(
  //           'Error!',
  //           `There was a problem deleting the category: ${error.message}`,
  //           'error'
  //         );
  //       });
  //     }
  //   });
  // };

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
