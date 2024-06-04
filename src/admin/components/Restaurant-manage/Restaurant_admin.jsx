import React, { useState, useEffect } from "react";
import "./css/restaurant_admin.css";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import OwnerMenu from "../ownerMenu/OwnerMenu";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Restaurant_admin = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [datas, setDatas] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null); // Added state to hold ID of hotel to delete

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/restaurant/restaurant"
      );
      setDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    // Modified handleDelete to take id parameter
    try {
      await axios.delete(
        `http://43.202.102.25:8000/tourapi/hotel/delete/${id}/`
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hotel deleted successfully!",
      });
      // After successful delete, refetch data
      fetchData();
      setShowConfirm(false); // Close confirmation dialog
    } catch (error) {
      console.error("Error deleting hotel:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete hotel. Please try again later.",
      });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <OwnerMenu />
      <section>
        <div className="box_container_hotel">
          <div className="box_content_hotel">
            <div className="productHead_content">
              <h2 className="htxthead">
                <span className="spennofStyleadmin"></span>Restaurant
              </h2>
              <div className="categoryBoxfiler">
                <Link to="/add_restaurant" className="box_add_product">
                  <BiPlus id="icon_add_product" />
                  <p>Add</p>
                </Link>
              </div>
            </div>

            <div className="box_container_tour">
              {datas.length > 0 ? (
                datas.map((data, index) => (
                  <div className="box_container_tour_admin" key={index}>
                    <div className="container_image_tour">
                      <img src={data.logo} alt="image" />
                    </div>
                    <div className="container_desc_tour">
                      <h3>Name restaurant: {data.name}</h3>
                      {/* <Expandable>{data.description}</Expandable> */}
                      <div className="txt_tour">
                        <p className="price_number_ones">
                          Description: ${data.description}
                        </p>
                      </div>

                      <p className="txt_address">Address: {data.address}</p>
                      <p className="txt_address">Phone: {data.phone}</p>
                      <p className="txt_address">Time-Open: {data.time}</p>
                    </div>
                    <div className="btn_delete_view">
                      <div
                        onClick={() => {
                          setIdToDelete(data.id);
                          setShowConfirm(true);
                        }}
                        className="box_btn_saveDelete"
                      >
                        Delete
                      </div>
                      <Link
                        to={`/edit_restaurant/${data.id}`}
                        className="box_btn_saveEdit"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No restaurant available</p>
              )}
            </div>

            <div className="box_container_next_product">
              <button className="box_prev_left_product">
                <AiOutlineLeft id="box_icon_left_right_product" />
                <p>Prev</p>
              </button>

              <div className="box_num_product">
                <div className="num_admin_product">
                  <p>1</p>
                </div>
                <div className="num_admin_product">
                  <p>2</p>
                </div>
              </div>

              <button className="box_prev_right_product">
                <p>Next</p>
                <AiOutlineRight id="box_icon_left_right_product" />
              </button>
            </div>

            {showConfirm && (
              <div className="background_addproductpopup_box">
                <div className="hover_addproductpopup_box">
                  <div className="box_logout">
                    <p>Are you sure you want to delete?</p>
                  </div>
                  <div className="btn_foasdf">
                    <button
                      className="btn_cancel btn_addproducttxt_popup"
                      onClick={handleCancelDelete}
                    >
                      No
                    </button>
                    <button
                      className="btn_confirm btn_addproducttxt_popup"
                      onClick={() => handleDelete(idToDelete)} // Pass idToDelete to handleDelete
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Restaurant_admin;
