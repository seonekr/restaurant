import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./bannerres.css";
import { Link } from "react-router-dom";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { IoMdTime, IoIosStar } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import EditBanner from "./Editbanner";
import no_picture from "../../../img/no-picture-icon.jpg";

const Bannerres = () => {
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storage && storage.restaurant_id) {
      getBanners();
    } else {
      console.error("No restaurant ID found in local storage.");
    }
  }, []);

  const getBanners = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/restaurants/${storage.restaurant_id}/`
      );
      const { name, logo, address, banner_image, phone, description, time } =
        response.data;

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      setLoading(false);
    }
  };

  const handleEdit = (restaurants, field) => {
    setSelectedFood(restaurants);
    setFieldToEdit(field);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    await getBanners(); // Refresh the data
    setShowEditModal(false); // Close the modal
  };

  return (
    <>
      <div>
        <div className="container_boxHeaderAt_mainpage22">
          <div className="box_logo_main">
            {loading ? (
              <Skeleton circle height={200} width={200} />
            ) : (
              <img
                src={restaurant.logo || no_picture}
                alt="Restaurant Logo"
                x
                onClick={() => setSelectedFood(restaurant)}
              />
            )}
            <div className="iconnChangeImagelogo">
              {loading ? (
                <Skeleton circle height={30} width={30} />
              ) : (
                <IoCamera onClick={() => handleEdit(restaurant, "logo")} />
              )}
            </div>
          </div>
          <div className="box_heardOfGrooup_main">
            <div className="header_box_of_header-main">
              <div className="description_header-main">
                <h3>{loading ? <Skeleton width={200} /> : restaurant.name}</h3>
                <p>
                  {loading ? <Skeleton count={3} /> : restaurant.description}
                </p>
                <div className="iconnChangeImageEditname">
                  {loading ? (
                    <Skeleton width={30} height={30} />
                  ) : (
                    <FaPencil
                      onClick={() =>
                        handleEdit(restaurant, "name", "description")
                      }
                    />
                  )}
                </div>

                <div className="contact_head_Boxdetails-tel">
                  <div className="contact_head_Boxdetails2">
                    <div className="iconnDetails_head">
                      {loading ? (
                        <Skeleton width={20} height={20} />
                      ) : (
                        <FiPhone />
                      )}
                    </div>
                    <p>
                      {loading ? <Skeleton width={100} /> : restaurant.phone}
                    </p>
                  </div>
                  <div className="contact_head_Boxdetails3">
                    {loading ? (
                      <Skeleton width={10} />
                    ) : (
                      <IoMdTime className="iconnDetails_head" />
                    )}
                    <p>
                      {loading ? <Skeleton width={100} /> : restaurant.time}
                    </p>
                    <div className="iconEdit_time">
                      {loading ? (
                        <Skeleton width={30} height={30} />
                      ) : (
                        <FaPencil
                          onClick={() =>
                            handleEdit(restaurant, "phone", "time")
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="header_contact_details-main22">
                <div className="contact_head_Boxdetails2">
                  <div className="all_star_box">
                    {loading ? (
                      <>
                        <Skeleton width={50} />
                      </>
                    ) : (
                      <>
                        <IoIosStar className="iconstar_review adtiveStar" />
                        <IoIosStar className="iconstar_review adtiveStar" />
                        <IoIosStar className="iconstar_review adtiveStar" />
                        <IoIosStar className="iconstar_review" />
                        <IoIosStar className="iconstar_review" />
                      </>
                    )}
                  </div>

                  <p>{loading ? <Skeleton width={50} /> : "29 Review"}</p>
                </div>
                {loading ? (
                  <Skeleton width={50} />
                ) : (
                  <Link to="#" className="switch_btn1">
                    View
                  </Link>
                )}
              </div>
            </div>
            <div className="header_contact_details_box22">
              <div className="header_contact_details-map22">
                <div className="contact_head_Boxdetails-map22">
                  {loading ? (
                    <Skeleton width={20} height={20} />
                  ) : (
                    <FiMapPin className="iconnDetails_head-map" />
                  )}
                  <p>
                    {loading ? <Skeleton width={120} /> : restaurant.address}
                  </p>
                </div>
                {loading ? (
                  <Skeleton width={20} height={30} />
                ) : (
                  <Link to="#" className="switch_btn22">
                    View
                  </Link>
                )}

                <div className="iconEdit_map11">
                  {loading ? (
                    <Skeleton width={20} height={30} />
                  ) : (
                    <FaPencil
                      onClick={() => handleEdit(restaurant, "address")}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box_banner_content2">
          <div className="banner-container">
            {loading ? (
              <Skeleton height={300} />
            ) : (
              <img
                src={restaurant.banner_image}
                alt="Restaurant Banner"
                onClick={() => setSelectedFood(restaurant)}
              />
            )}
            <div className="camera-icon22">
              {loading ? (
                <Skeleton circle height={30} width={30} />
              ) : (
                <IoCamera
                  onClick={() => handleEdit(restaurant, "bannerimage")}
                />
              )}
            </div>
          </div>
        </div>
        {showEditModal && (
          <EditBanner
            banner={selectedFood}
            fieldToEdit={fieldToEdit}
            onCancel={() => setShowEditModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default Bannerres;
