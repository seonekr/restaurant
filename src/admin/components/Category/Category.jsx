import React, { useEffect, useState } from "react";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import "./category.css";
import Editcategory from "./Editcategory";
import Addcategory from "./Addcategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch(`${import.meta.env.VITE_API}/restaurants/1/categories/list/`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedCategory) => {
    // Save the updated category
    fetch(`${import.meta.env.VITE_API}/restaurants/1/categories/${updatedCategory.id}/update/`, {
      method: "PUT",
      body: JSON.stringify(updatedCategory),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        // Update the category in the state
        setCategories(
          categories.map((cat) =>
            cat.id === updatedCategory.id ? updatedCategory : cat
          )
        );
        setShowEditModal(false);
      }
    });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
      // Delete the category
      // Assuming you have an API endpoint for deleting category
      fetch(`${import.meta.env.VITE_API}/restaurants/1/categories/${category.id}/delete/`, {
      // fetch(`http://127.0.0.1:8000/restaurant/category/${category.id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          // Remove the category from the state
          setCategories(categories.filter((cat) => cat.id !== category.id));
        }
      });
    }
  };

  const handleOpenPopup = () => {
    setShowAddModal(true);
  };

  const handleClosePopup = () => {
    setShowAddModal(false);
  };

  const handleSubmitForm = () => {
    // Handle form submission logic here
    handleClosePopup();
  };

  return (
    <>
      <OwnerMenu />
      <div className="board_category">
        <div className="container_category">
          <div className="box-category">
            <h2>Category in Restaurant</h2>
            <div className="box-add-category">
              <button className="add_table_btn" onClick={handleOpenPopup}>
                <p>Add Category</p>
              </button>
            </div>
          </div>
          <div className="category-box">
            {categories.map((category) => (
              <div key={category.id} className="category-item">
                <p>{category.name}</p>
                <div className="category-actions">
                  <button
                    className="btn-edit-cat"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete-cat"
                    onClick={() => handleDelete(category)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showEditModal && (
        <Editcategory
          category={selectedCategory}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
      {showAddModal && (
        <Addcategory onClose={handleClosePopup} onSubmit={handleSubmitForm} />
      )}
    </>
  );
};

export default Category;
