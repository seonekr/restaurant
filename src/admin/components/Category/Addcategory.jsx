import React, { useState } from "react";
import "./addcategory.css";
import Swal from "sweetalert2";

const Addcategory = ({ isOpen, onClose, onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", categoryName);
      formdata.append("restaurant", "1");

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch("http://127.0.0.1:8000/restaurant/category", requestOptions);

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      Swal.fire({
        icon: "success",
        title: "Category Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear the input field and close the modal
      setCategoryName("");
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error adding category:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add category",
      });
    }
  };

  return (
    <div className={`popup-overlay-edit ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Add Category</h2>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className="box-cat-add">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Addcategory;
