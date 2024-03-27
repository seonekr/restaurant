import "./css/mainpage.css";
import React, { useState } from "react";
import Menubar from "./Menubar";
import Itemfood from "./Itemfood";
import logo2 from "../../img/logo2.png";
import banner from "../../img/banner.png";
// import imageban from "../../img/image.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";

const Mainpage = () => {
  // Popup Edit Name an Description
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  // Popup Edit Logo Image
  const [isOpenlogo, setIsOpenlogo] = useState(false);
  const togglePopuplogo = () => {
    setIsOpenlogo(!isOpenlogo);
  };
  // Popup Edit Banner Image
  const [isOpenban, setIsOpenban] = useState(false);
  const togglePopupbanner = () => {
    setIsOpenban(!isOpenban);
  };
  // Popup Edit Time
  const [isOpentime, setIsOpentime] = useState(false);
  const togglePopuptime = () => {
    setIsOpentime(!isOpentime);
  };
 
  return (
  <>
    <div className="container_boxhomepage">
      <div className="container_boxHeaderAt_store2">
        <div className="box_logo">
          <img src={logo2} className="logo_box_homepage" />
          <div className="iconnChangeImagelogo">
            <IoCamera onClick={togglePopuplogo} />
          </div>
        </div>
        <div className="box_heardOfGrooup2">
          <div className="header_box_of_header-main">
            <div className="description_header-main">
              <h3>Name Restaurant</h3>
              <p>Description restaurant</p>
              <div className="iconnChangeImageEditname">
                <FaPencil onClick={togglePopup} />
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
                    <FaPencil onClick={togglePopuptime} />
                  </div>
                </div>
              </div>
            </div>

            <div className="header_contact_details-main">
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

            <div className="header_contact_details-map">
              <div className="contact_head_Boxdetails-map">
                <FiMapPin className="iconnDetails_head-map" />
                <p>131 Sapang Sisangvvone Road,
                  Ban Naxay, Vientiane 0100 ลาว</p>
              </div>
              <Link to="/addressMap" className="switch_btn2">
                View
              </Link>
              <div className="iconEdit_map">
                    <FaPencil onClick={togglePopuptime} />
                  </div>
            </div>
          </div>
      
        </div>
      </div>
      </div>
      <div className="container_boxHeaderAt_store">
        <div className="box_banner_content2">
          <div class="banner-container">
            <img src={banner} class="logo-banner" />
            <div class="camera-icon">
              <IoCamera onClick={togglePopupbanner} />
            </div>
          </div>
  
          <div className="container_boxcategory-main">
            <Link className="link_categor_l activeCategory" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
            <Link className="link_categor_l" to="#">
              Pizza
            </Link>
          </div>
        </div>
      </div>

      <Itemfood />
      <Menubar />

      {/* Popup Edit Name and Des */}
      {isOpen && (
        <div className="popup1">
          <div className="popup-content1">
            <div className="box-storename">
              <h2>Store name</h2>
              <input
                type="text"
                placeholder="Store name..."
                className="text-input-name1"
              />
            </div>
            <div className="box-storedes">
              <h2>Description</h2>
              <input
                type="text"
                placeholder="Description..."
                className="text-input-name1"
              />
            </div>
            <div className="btn-popup">
              <button onClick={togglePopup} className="btn-cancel1">
                Cancel
              </button>
              <button className="btn-ok1">OK</button>
            </div>
          </div>

        </div>
      )}
      {/* Popup Edit Logo */}
      {isOpenlogo && (
        <div className="popup">
          <div className="popup-content">
            <div className="">
              <h2>Add Logo image</h2>

              <div className="input-container2">
                <label htmlFor="file-upload" className="file-upload-label">
                  <input
                    id="file-upload"
                    type="file"
                    className="text-input-name2 visually-hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <IoImageOutline className="icon_cameraDp2" />
                  <span className="file-upload-text">Choose Image...</span>
                </label>
              </div>

              <div className="btn-popup2">
                <button onClick={togglePopuplogo} className="btn-cancel">
                  Cancel
                </button>
                <button className="btn-ok">OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Popup Edit Banner */}
      {isOpenban && (
        <div className="popup">
          <div className="popup-content">
            <div className="">
              <h2>Add banner image</h2>

              <div className="input-container2">
                <label htmlFor="file-upload" className="file-upload-label">
                  <input
                    id="file-upload"
                    type="file"
                    className="text-input-name2 visually-hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <IoImageOutline className="icon_cameraDp2" />
                  <span className="file-upload-text">Choose Image...</span>
                </label>
              </div>

              <div className="btn-popup2">
                <button onClick={togglePopupbanner} className="btn-cancel">
                  Cancel
                </button>
                <button className="btn-ok">OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Popup Edit Time */}
      {isOpentime && (
        <div className="popup2">
          <div className="popup-content2">
            <h2>
              Enter your time open <br />
              restaurant
            </h2>
            <div className="time-selector">
              <input type="time" placeholder="Time..." className="time-input" />
              <span className="to-label">To</span>
              <input type="time" placeholder="Time..." className="time-input" />
            </div>
            <div className="btn-popuptime">
              <button onClick={togglePopuptime} className="btn-cancel1">
                Cancel
              </button>
              <button className="btn-ok1">OK</button>
            </div>
          </div>
        </div>
      )}
   
    </>
  );
};

export default Mainpage;
