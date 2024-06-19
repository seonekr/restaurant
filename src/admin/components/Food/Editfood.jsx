import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./editfood.css";

const Editfood = ({ selectedFood, onCancel, fieldToEdit, onSave }) => {
  const storage = JSON.parse(window.localStorage.getItem("user"));

  const [editedFood, setEditedFood] = useState({
    id: selectedFood.id,
    name: selectedFood.name,
    price: selectedFood.price,
    image: null,
  });

  const [editMode, setEditMode] = useState(null); // State to track which field to edit

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setEditedFood({ ...editedFood, [name]: e.target.files[0] });
    } else {
      setEditedFood({ ...editedFood, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editedFood.name);
      formData.append("price", editedFood.price);
      if (editedFood.image) {
        formData.append("image", editedFood.image);
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_API}/restaurants/${
          storage.restaurant_id
        }/menu_items/${editedFood.id}/update/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Updated:", response.data);
      onClose(); // Close edit form after successful update
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Your food item has been updated.",
      }).then(() => {
        window.location.reload(); // Reload page after update (adjust as needed)
      });
    } catch (error) {
      console.error("Error updating food:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating the food item.",
      });
    }
  };

  const handleCancel = () => {
    onClose(); // Close edit form without saving changes
  };

  const handleEditClick = (field) => {
    setEditMode(field); // Set edit mode to the selected field (name, price, image)
  };

  return (
    <div className="edit-food-form">
      <h2>Edit Food</h2>
      <form onSubmit={handleSubmit}>
        {editMode === "name" && (
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedFood.name}
              onChange={handleChange}
            />
          </label>
        )}
        {editMode === "price" && (
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={editedFood.price}
              onChange={handleChange}
            />
          </label>
        )}
        {editMode === "image" && (
          <label>
            Image:
            <input type="file" name="image" onChange={handleChange} />
          </label>
        )}
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      {/* Toggle buttons to switch between editing name, price, and image */}
      <div className="toggle-buttons">
        <button onClick={() => handleEditClick("name")}>Edit Name</button>
        <button onClick={() => handleEditClick("price")}>Edit Price</button>
        <button onClick={() => handleEditClick("image")}>Edit Image</button>
      </div>
    </div>
  );
};

export default Editfood;

// <div className="edit-food-form">
//   <h2>Edit Food</h2>
//   <form onSubmit={handleSubmit}>
//     {editMode === "name" && (
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={editedFood.name}
//           onChange={handleChange}
//         />
//       </label>
//     )}
//     {editMode === "price" && (
//       <label>
//         Price:
//         <input
//           type="number"
//           name="price"
//           value={editedFood.price}
//           onChange={handleChange}
//         />
//       </label>
//     )}
//     {editMode === "image" && (
//       <label>
//         Image:
//         <input type="file" name="image" onChange={handleChange} />
//       </label>
//     )}
//     <div className="form-buttons">
//       <button type="submit">Save</button>
//       <button type="button" onClick={handleCancel}>
//         Cancel
//       </button>
//     </div>
//   </form>
//   {/* Toggle buttons to switch between editing name, price, and image */}
//   <div className="toggle-buttons">
//     <button onClick={() => handleEditClick("name")}>Edit Name</button>
//     <button onClick={() => handleEditClick("price")}>Edit Price</button>
//     <button onClick={() => handleEditClick("image")}>Edit Image</button>
//   </div>
// </div>
