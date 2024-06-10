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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(window.localStorage.getItem("user"));
    if (storage && storage.restaurant_id) {
      getProducts(storage.restaurant_id);
    } else {
      console.error("No restaurant ID found in local storage.");
    }
  }, []);

  const getProducts = (restaurant_id) => {
    axios
      .get(import.meta.env.VITE_API + `/restaurants/${restaurant_id}/menu_items/list/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleEditFood = (food, field) => {
    setSelectedFood({ ...food, field }); // Set selectedFood with both food data and the field to edit
  };

  const handleCloseEdit = () => {
    setSelectedFood(null);
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
          .delete(import.meta.env.VITE_API + `/restaurant/menu-items/${productId}/`)
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
                      alt={product.name}
                      onClick={() => setSelectedFood(product)}
                    />
                    <div
                      className="deleteBox_productcontent"
                      onClick={() => handleDelete(product.id)}
                    >
                      <AiOutlineDelete />
                    </div>
                    <div className="icon_cameraDp22">
                      <IoCamera onClick={() => handleEditFood(product, "image")} />
                    </div>
                    <div className="txt_boxDescription3">
                      <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <div className="edit-icon-name">
                          <FaPencil
                            onClick={() => handleEditFood(product, "name")} // Specify field to edit
                          />
                        </div>
                      </div>
                      <div className="product-info">
                        <p className="product-price">Price: ${product.price}</p>
                        <div className="edit-icon-price">
                          <FaPencil
                            onClick={() => handleEditFood(product, "price")} // Specify field to edit
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

        {selectedFood && (
          <Editfood
            selectedFood={selectedFood}
            onClose={handleCloseEdit}
          />
        )}
      </div>
    </>
  );
}

export default Itemfood;
