import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./editfood.css";
const Editfood = ({ selectedFood, onClose }) => {
  const [editedFood, setEditedFood] = useState({
    id: selectedFood.id,
    name: selectedFood.name,
    price: selectedFood.price,
  });

  const [editField, setEditField] = useState('name'); // State to track which field to edit

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFood({ ...editedFood, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://43.201.166.195:8000/restaurants/1/menu_items/${editedFood.id}/update/`,
        editedFood
      );
      console.log('Updated:', response.data);
      onClose(); // Close edit form after successful update
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'Your food item has been updated.',
      }).then(() => {
        window.location.reload(); // Reload page after update (adjust as needed)
      });
    } catch (error) {
      console.error('Error updating food:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating the food item.',
      });
    }
  };

  const handleCancel = () => {
    onClose(); // Close edit form without saving changes
  };

  return (
    <div className="edit-food-form">
      <h2>Edit Food</h2>
      <form onSubmit={handleSubmit}>
        {editField === 'name' && (
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
        {editField === 'price' && (
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
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      {/* Toggle buttons to switch between editing name and price */}
      <div className="toggle-buttons">
        <button onClick={() => setEditField('name')}>Edit Name</button>
        <button onClick={() => setEditField('price')}>Edit Price</button>
      </div>
    </div>
  );
};

export default Editfood;
