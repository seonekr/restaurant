import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./editfood.css";

const Editfood = ({ food, fieldToEdit, onSave, onCancel }) => {
  const [updatedFood, setUpdatedFood] = useState({ ...food });
  const [imagePreview, setImagePreview] = useState(food.image);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setUpdatedFood({ ...updatedFood, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setUpdatedFood({ ...updatedFood, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedFood);
  };

  return (
    <div className="popup-overlay-edit">
      <div className="modal-content-edit">
        <h2>Edit {fieldToEdit}</h2>
        <div>
        {fieldToEdit === "image" && (
        <>
          <input
            className="edit-image"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <div className="image-container2">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>
        </>
      )}
          {fieldToEdit === "name" && (
            <input
              // type="text"
              className="edit-name2"
              name="name"
              value={updatedFood.name}
              onChange={handleChange}
            />
          )}
          {fieldToEdit === "price" && (
            <input
              type="number"
              name="price"
              value={updatedFood.price}
              onChange={handleChange}
            />
          )}
          <div className="button-group-edit">
            <button className="btn-save-edit" onClick={handleSubmit}>
              Save
            </button>
            <button
              className="btn-cancel-edit"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editfood;
