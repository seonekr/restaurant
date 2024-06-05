import "./css/homePage.css";
import React, { useEffect, useState } from "react";
import Menufooter from "../components/Menufooter";
import FoodItem from "../components/FoodItem";
import logo1 from "../img/Logo1.png";
import banner22 from "../img/banner.png";
import { Link, useParams } from "react-router-dom"; // Import useParams
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import axios from "axios";

const HomePage = () => {
  const { restaurantId } = useParams(); // Get restaurant ID from the URL
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("All");
  const [filter, setFilter] = useState("");
  const [goodsList, setGoodsList] = useState([]); // Assuming you need to store the goods list
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getCategories();
    getBanners();
  }, []);
  const getBanners = () => {
    axios
      .get(import.meta.env.VITE_API + `/restaurant/restaurant`)
      .then((response) => {
        setBanners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  };
  const getCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/restaurant/${restaurantId}/category`, // Use restaurantId
    };

    axios
      .request(config)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryClick = (categoryName) => {
    setCategoryName(categoryName);
  };

  useEffect(() => {
    let myUrl = `/restaurant/${restaurantId}/?category_type=${filter}`; // Use restaurantId
    if (categoryName !== "All") {
      myUrl += `&category_name=${categoryName}`;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + myUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setGoodsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryName, filter, restaurantId]); // Add restaurantId to dependencies

  const [value, setValue] = React.useState(3);
  return (
    <>
      <Menufooter />
      {banners.map((banner) => (
        <div>
          <div className="container_boxHeaderAt_store2-hp" key={banner.id}>
            <div className="box_logo">
              <img src={banner.logo} alt="logo" />
            </div>
            <div className="box_heardOfGrooup">
              <div className="header_box_of_header">
                <h3>{banner.name}</h3>
                <p>{banner.description}</p>

                <div className="contact_head_Boxdetails">
                  <FiPhone className="iconnDetails_head" />
                  <p className="text">{banner.phone}</p>
                  <IoMdTime className="iconnDetails_head" />
                  <p className="text">{banner.time}</p>
                </div>

                <div className="contact_head_Boxdetails-star">
                  <Rating
                    className="star-icon"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <p className="text-review">29 Review</p>
                  <Link to="/reviews" className="switch_btn_view_hp2">
                    View
                  </Link>
                </div>
              </div>
              <div className="header_contact_details_box">
                <div className="contact_head_Boxdetails-map-hp">
                  <FiMapPin className="iconnDetails_head-map" />
                  <p>{banner.address}</p>
                  <Link to="/addressMap" className="switch_btn2-hp2">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="container_boxHeaderAt_store">
            <div className="box_banner_content">
              <img src={banner.bannerimage} alt="" />
            </div>
          </div>
        </div>
      ))}
      <FoodItem />
    </>
  );
};

export default HomePage;
