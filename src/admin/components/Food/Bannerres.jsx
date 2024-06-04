import React, { useEffect, useState } from "react";
import "./bannerres.css";
import logo1 from "../../../img/Logo1.png";
import banner1 from "../../../img/banner.png";
// import imageban from "../../img/image.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import axios from "axios"; // You need axios or any other library to make HTTP requests

const Bannerres = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {

    
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "csrftoken=3kqVvYdmUvnC1fSP3mrkCyUHahHcQlxD");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/restaurant/restaurant", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  });

  const [mainImageBanner, setMainImageBanner] = useState(null);
  const [mainImageLogo, setMainImageLogo] = useState(null);
  ///Choose image handleImageLogo

  return (
    <>
      <div>
        <div className="container_boxHeaderAt_mainpage22">
          <div className="box_logo_main">
            {mainImageLogo && mainImageLogo.length > 0 ? (
              <img src={URL.createObjectURL(mainImageLogo[0])} alt="logo" />
            ) : (
              <img src={logo1} alt="logo" />
            )}

            <div className="iconnChangeImagelogo">
              <IoCamera />
            </div>
          </div>
          <div className="box_heardOfGrooup_main">
            <div className="header_box_of_header-main">
              <div className="description_header-main">
                <h3>Name Restaurant</h3>
                <p>Description restaurant</p>
                <div className="iconnChangeImageEditname">
                  <FaPencil />
                </div>
                <div className="contact_head_Boxdetails-tel">
                  <div className="contact_head_Boxdetails2">
                    <div className="iconnDetails_head">
                      <FiPhone />
                    </div>
                    <p>+856 20 55 000 959</p>
                  </div>
                  <div className="contact_head_Boxdetails2">
                    <IoMdTime className="iconnDetails_head" />
                    <p>8:00 - 20:00</p>
                    <div className="iconEdit_time">
                      <FaPencil />
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
                <Link to="/reviews" className="switch_btn1">
                  View
                </Link>
              </div>
            </div>
            <div className="header_contact_details_box">
              <div className="header_contact_details-map22">
                <div className="contact_head_Boxdetails-map22">
                  <FiMapPin className="iconnDetails_head-map" />
                  <p>
                    131 Sapang Sisangvvone Road, Ban Naxay, Vientiane 0100 ลาว
                  </p>
                </div>
                <Link to="/addressMap" className="switch_btn22">
                  View
                </Link>
                <div className="iconEdit_map11">
                  <FaPencil />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container_boxHeaderAt_store">
        <div className="box_banner_content2">
          <div class="banner-container">
            {mainImageBanner && mainImageBanner.length > 0 ? (
              <img src={URL.createObjectURL(mainImageBanner[0])} alt="Banner" />
            ) : (
              <img src={banner1} alt="Banner" />
            )}
            <div class="camera-icon22">
              <IoCamera />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bannerres;
