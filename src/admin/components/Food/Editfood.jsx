import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./editfood.css";

const Editfood = ({ selectedFood, onCancel, fieldToEdit, onSave }) => {
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [imagePreview, setImagePreview] = useState(null); // State for previewing image
  const [editedFood, setEditedFood] = useState({
    id: selectedFood.id,
    name: selectedFood.name,
    price: selectedFood.price,
    image: null, // Initialize image as null
  });

  useEffect(() => {
    setImagePreview(selectedFood.image); // Set initial image preview
  }, [selectedFood.image]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setEditedFood({ ...editedFood, [name]: e.target.files[0] });
      setImagePreview(URL.createObjectURL(e.target.files[0])); // Update image preview
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
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/menu_items/${editedFood.id}/update/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Call onSave to update parent component state
      onSave(response.data);
  
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Your food item has been updated.",
      }).then(() => {
        // Reload the page after a short delay to ensure state update is complete
        setTimeout(() => {
          window.location.reload();
        }, 100); // Adjust delay as needed
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
  

  return (
    <div className="popup-overlay-editfood">
      <div className="modal-content-editfood">
        <h3>Edit {fieldToEdit}</h3>
        <form onSubmit={handleSubmit}>
          {fieldToEdit === "image" && (
            <>
              <input
                className="edit-logo"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="image-container-editfood">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview2"
                  />
                )}
              </div>
            </>
          )}

          {fieldToEdit === "name" && (
            <>
              <input
                className="edit-name"
                type="text"
                name="name"
                value={editedFood.name}
                onChange={handleChange}
              />
            </>
          )}

          {fieldToEdit === "price" && (
            <>
              <input
                className="edit-price"
                type="text"
                name="price"
                value={editedFood.price}
                onChange={handleChange}
              />
            </>
          )}

          <div className="button-group-editfood">
            <button className="btn-save-editfood">
              Save
            </button>
            <button
              className="btn-cancel-editfood"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
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
