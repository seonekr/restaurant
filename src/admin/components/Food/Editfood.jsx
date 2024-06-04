import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./editfood.css";

const Editfood = ({ food, fieldToEdit, onSave, onCancel }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      fieldToEdit === "name"
        ? food.name
        : fieldToEdit === "price"
        ? food.price
        : food.image
    );
  }, [food, fieldToEdit]);

  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave({ ...food, [fieldToEdit]: value });
        Swal.fire("Saved!", "Your changes have been saved.", "success").then(
          () => {
            onCancel(); // Close the modal after saving
          }
        );
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel editing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        onCancel();
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(reader.result); // Set the new image data to the value state
    };
    if (file) {
      reader.readAsDataURL(file);
      onSave({ ...food, image: file }); // Pass the File object to the parent component for saving
    }
  };

  return (
    <div className="popup-overlay-edit">
      <div className="modal-content-edit">
        <h2>
          Edit {fieldToEdit.charAt(0).toUpperCase() + fieldToEdit.slice(1)}
        </h2>
        {fieldToEdit !== "image" ? (
          <input
            type={fieldToEdit === "price" ? "number" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              fieldToEdit.charAt(0).toUpperCase() + fieldToEdit.slice(1)
            }
          />
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {value && (
              <img src={value} alt="Preview" className="image-preview" /> // Display preview image
            )}
          </div>
        )}
        <div className="button-group-edit">
          <button className="btn-save-edit" onClick={handleSave}>
            Save
          </button>
          <button className="btn-cancel-edit" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editfood;