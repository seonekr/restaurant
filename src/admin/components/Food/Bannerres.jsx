import React, { useEffect, useState } from "react";
import "./bannerres.css";
import { Link } from "react-router-dom";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { IoMdTime, IoIosStar, IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const Bannerres = () => {
  // const [restaurantData, setRestaurantData] = useState(null);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [restaurant, setRestaurant] = useState({
    name: "",
    logo: "",
    address: "",
    banner_image: "",
    phone: "",
    description: "",
    time: "",
  });
  useEffect(() => {
    getBanners();
  }, []);
  const getBanners = () => {
    axios
      .get(`${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/`)
      .then((response) => {
        const {
          name,
          logo,
          address,
          banner_image,
          phone,
          description,
          time,
        } = response.data;
  
        // Ensure that if any field is missing or undefined, it defaults to an empty string
        const updatedRestaurant = {
          name: name || "",
          logo: logo || "",
          address: address || "",
          banner_image: banner_image || "",
          phone: phone || "",
          description: description || "",
          time: time || "",
        };
  
        setRestaurant(updatedRestaurant);
      })
      .catch((error) => {
        console.error("Error fetching restaurant details:", error);
      });
  };
  const handleEdit = (restaurants, field) => {
    setSelectedFood(restaurants);
    setFieldToEdit(field);
    setShowEditModal(true);
  };
  const handleSave = (updatedBanner) => {
    const formData = new FormData();
    formData.append("name", updatedBanner.name);
    formData.append("description", updatedBanner.description);
    formData.append("price", updatedBanner.price);
    formData.append("restaurant", updatedBanner.restaurant);
    if (updatedBanner.image instanceof File) {
      formData.append("image", updatedBanner.image);
    }

    axios
      .patch(
        `${import.meta.env.VITE_API}/restaurants/${
          updatedBanner.id
        }/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setBanners(
          banners.map((banner) =>
            banner.id === updatedBanner.id ? response.data : banner
          )
        );
        setShowEditModal(false);
        Swal.fire("Saved!", "Your changes have been saved.", "success");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        Swal.fire("Error!", "Failed to save changes.", "error");
      });
  };

  return (
    <>
      <div>
        {/* {banners.map((banner) => ( */}
          <div>
            <div className="container_boxHeaderAt_mainpage22" >
              <div className="box_logo_main">
                <img
                src={restaurant.logo} 
                  onClick={() => setSelectedFood(restaurant)}
                />
                <div className="iconnChangeImagelogo">
                  <IoCamera onClick={() => handleEdit(restaurant, "logo")} />
                </div>
              </div>
              <div className="box_heardOfGrooup_main">
                <div className="header_box_of_header-main">
                  <div className="description_header-main">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.description}</p>
                    <div className="iconnChangeImageEditname">
                      <FaPencil
                        onClick={() =>
                          handleEdit(restaurant, "name", "description")
                        }
                      />
                    </div>
                    <div className="contact_head_Boxdetails-tel">
                      <div className="contact_head_Boxdetails2">
                        <div className="iconnDetails_head">
                          <FiPhone />
                        </div>
                        <p>{restaurant.phone}</p>
                      </div>
                      <div className="contact_head_Boxdetails2">
                        <IoMdTime className="iconnDetails_head" />
                        <p>{restaurant.time}</p>
                        <div className="iconEdit_time">
                          <FaPencil
                            onClick={() => handleEdit(restaurant, "phone", "time")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="header_contact_details-main22">
                    <div className="contact_head_Boxdetails2">
                      <div className="all_star_box">
                        <IoIosStar className="iconstar_review adtiveStar" />
                        <IoIosStar className="iconstar_review adtiveStar" />
                        <IoIosStar className="iconstar_review adtiveStar" />
                        <IoIosStar className="iconstar_review" />
                        <IoIosStar className="iconstar_review" />
                      </div>
                      <p>29 Review</p>
                    </div>
                    <Link to="#" className="switch_btn1">
                      View
                    </Link>
                  </div>
                </div>
                <div className="header_contact_details_box22">
                  <div className="header_contact_details-map22">
                    <div className="contact_head_Boxdetails-map22">
                      <FiMapPin className="iconnDetails_head-map" />
                      <p>{restaurant.address}</p>
                    </div>
                    <Link to="#" className="switch_btn22">
                      View
                    </Link>
                    <div className="iconEdit_map11">
                      <FaPencil onClick={() => handleEdit(restaurant, "address")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="container_boxHeaderAt_store"> */}
            <div className="box_banner_content2">
              <div class="banner-container">
                <img
                  src={restaurant.banner_image}
                  onClick={() => setSelectedFood(restaurant)}
                />
                {/* {mainImageBanner && mainImageBanner.length > 0 ? (
              <img src={URL.createObjectURL(mainImageBanner[0])} alt="Banner" />
            ) : (
              <img src={banner1} alt="Banner" />
            )} */}
                <div class="camera-icon22">
                  <IoCamera onClick={() => handleEdit(restaurant, "bannerimage")} />
                </div>
              </div>
            </div>
          </div>
           </div>
        {/* ))} */}
        {showEditModal && (
          <EditBanner
            banner={selectedFood}
            fieldToEdit={fieldToEdit}
            onSave={handleSave}
            onCancel={() => setShowEditModal(false)}
          />
        )}
   
    </>
  );
};

export default Bannerres;
