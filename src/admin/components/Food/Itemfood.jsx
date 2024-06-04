import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import AdminMenu from "../ownerMenu/OwnerMenu";
import axios from "axios";
import Editfood from "./Editfood";
import "./itemfood1.css";
import Bannerres from "./Bannerres";
function Itemfood() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get(import.meta.env.VITE_API + "/restaurant/menu-items/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleEdit = (menu_items, field) => {
    setSelectedFood(menu_items);
    setFieldToEdit(field);
    setShowEditModal(true);
  };
  const handleSave = (updatedFood) => {
    const {id, name, price} = updatedFood; // Destructure required fields
    const updatedData = {
      id,
      name,
      price,
    };

    // Check if an image file was selected or if a new image URL was provided
    if (image instanceof File) {
      updatedFood.append("image", image); // Append the new image file
    } else if (typeof image === "string") {
      updatedFood.append("image", image); // Append the existing image URL
    }


    axios
      .put(
        import.meta.env.VITE_API + `/restaurant/menu-items/${id}/`,
        updatedData
      )
      .then(() => {
        setProducts(
          products.map((product) => (product.id === id ? updatedFood : product))
        );
        setShowEditModal(false);
        Swal.fire("Saved!", "Your changes have been saved.", "success");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        Swal.fire("Error!", "Failed to save changes.", "error");
      });
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            import.meta.env.VITE_API + `/restaurant/menu-items/${productId}/`
          )
          .then(() => {
            setProducts(products.filter((product) => product.id !== productId));
            Swal.fire("Deleted!", "The item has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
          });
      }
    });
  };

  return (
    <>
      <AdminMenu />
      <div className="box-menu-owner">
        <div className="food_container_box-main111">
          <div className="">
            <Bannerres />
          </div>
          <div className="poster_food-mainpage">
            <div className="filter2">
              <div></div>
              <h3>Food</h3>
            </div>
            <div>
              <Link to="/addproduct1" className="add_food_btn">
                <p>Add food</p>
              </Link>
            </div>
          </div>
          <div className="box_itemFood_container_main11">
            <div className="container">
              {products.map((product) => (
                <div className="box_itemFood-main" key={product.id}>
                  <div className="box_itemFood_item_main">
                    <img
                      className="image-pv-item"
                      src={product.image}
                      onClick={() => setSelectedFood(product)}
                    />
                    <div
                      className="deleteBox_productcontent"
                      onClick={() => handleDelete(product.id)}
                    >
                      <AiOutlineDelete />
                    </div>
                    <div className="icon_cameraDp22">
                      <IoCamera onClick={() => handleEdit(product, "image")} />
                    </div>
                    <div className="txt_boxDescription3">
                      <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <div className="edit-icon-name">
                          <FaPencil
                            onClick={() => handleEdit(product, "name")}
                          />
                        </div>
                      </div>
                      <div className="product-info">
                        <p className="product-price">Price: ${product.price}</p>
                        <div className="edit-icon-price">
                          <FaPencil
                            onClick={() => handleEdit(product, "price")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showEditModal && (
          <Editfood
            food={selectedFood}
            fieldToEdit={fieldToEdit}
            onSave={handleSave}
            onCancel={() => setShowEditModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default Itemfood;
