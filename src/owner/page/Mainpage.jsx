import "./css/mainpage.css";
import React, { useState } from "react";
import Menubar from "./Menubar";
import Itemfood from "./Itemfood";
import logo1 from "../../img/Logo1.png";
import banner1 from "../../img/banner.png";
// import imageban from "../../img/image.png";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import imageicon from "../../img/imageicon.jpg";

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

  const [mainImageBanner, setMainImageBanner] = useState(null);
  const [mainImageLogo, setMainImageLogo] = useState(null);
  ///Choose image handleImageLogo
  const handleImageLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageLogo([file]);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleImage = (event, index) => {
    const selectedImage = event.target.files[0];
    const updatedImages = [...selectedImages];
    updatedImages[index] = selectedImage;
    setSelectedImages(updatedImages);
  };

  ///Choose image handleImageBanner
  const handleImageBanner = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageBanner([file]);
      };

      reader.readAsDataURL(file);
    }
  };

  //// onClick icon edit product name
  const openConfirmationPopup = (productID) => {
    setUpdateProductId(productID.productName);
    setConfirmationPopupOpen(true);
  };

  const closeConfirmationPopup = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpen(false);
  };

  return (
    <>
      <div >
        <div className="container_boxHeaderAt_mainpage">
          <div className="box_logo_main">
            {mainImageLogo && mainImageLogo.length > 0 ? (
              <img src={URL.createObjectURL(mainImageLogo[0])} alt="logo" />
            ) : (
              <img src={logo1} alt="logo" />
            )}

            <div className="iconnChangeImagelogo">
              <IoCamera onClick={togglePopuplogo} />
            </div>
          </div>
          <div className="box_heardOfGrooup_main">
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
                  <p>
                    131 Sapang Sisangvvone Road, Ban Naxay, Vientiane 0100 ลาว
                  </p>
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
            {mainImageBanner && mainImageBanner.length > 0 ? (
              <img src={URL.createObjectURL(mainImageBanner[0])} alt="Banner" />
            ) : (
              <img src={banner1} alt="Banner" />
            )}
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
        <div className="background_popup_box">
          <div className="hover_popup_box">
            <div className="box_input-editname">
              <div className="box-store-name">
                <p>Store name</p>
                <input
                  type="text"
                  placeholder="Store name..."
                  className="input_of_txtAddproduct"
                />
              </div>
              <div className="box-store-des">
                <p>Store description</p>
                <input
                  type="text"
                  placeholder="Store description..."
                  className="input_of_txtAddproduct"
                />
              </div>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopup}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {isOpen && (
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
      )} */}
      {/* Popup Edit Logo */}
      {isOpenlogo && (
        <form className="popup1">
          <div className="popup-content1">
            <div className="box_input_image">
              <h2>Add Logo image</h2>

              <div className="input-container2">
                {mainImageLogo && mainImageLogo.length > 0 ? (
                  <img src={URL.createObjectURL(mainImageLogo[0])} alt="logo" />
                ) : (
                  <img src={imageicon} alt="logo" />
                )}
              </div>
              <label className="popup_Border_Boximagae">
                <input
                  type="file"
                  id="img"
                  onChange={handleImageLogo}
                  required
                />
                <IoImageOutline className="icon_cameraDp2" />
                <span className="file-upload-text">Choose Image...</span>
              </label>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopuplogo}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup">
                OK
              </button>
            </div>
          </div>
        </form>
      )}
      {/* Popup Edit Banner */}
      {isOpenban && (
        <form className="popup1">
          <div className="popup-content1">
            <div className="box_input_image">
              <h2>Add banner mage</h2>

              <div className="input-container2">
                {mainImageBanner && mainImageBanner.length > 0 ? (
                  <img
                    src={URL.createObjectURL(mainImageBanner[0])}
                    alt="Banner"
                  />
                ) : (
                  <img src={imageicon} alt="Banner" />
                )}
              </div>

              <label className="popup_Border_Boximagae">
                <input
                  type="file"
                  id="img"
                  onChange={handleImageBanner}
                  required
                />
                <IoImageOutline className="icon_cameraDp2" />
                <span className="file-upload-text">Choose Image...</span>
              </label>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopupbanner}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup">
                OK
              </button>
            </div>
          </div>
        </form>
      )}
      {/* Popup Edit Time */}
      {isOpentime && (
        <div className="background_popup_box-time">
          <div className="hover_popup_box-time">
            <div className="box_input-edittime">
              <h3>Enter your time open <br/>restaurant</h3>
              <div className="box-time">
                <div className="box-store-time">
                  <input
                    type="Time"
                    placeholder="Time..."
                    className="input_of_txtAddproduct"
                  />
                </div>
                <h4>To</h4>
                <div className="box-store-time">
                  <input
                    type="Time"
                    placeholder="Time..."
                    className="input_of_txtAddproduct"
                  />
                </div>
              </div>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopuptime}
              >
                CANCEL
              </button>
              <button className="btn_confirm btn_addproducttxt_popup">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mainpage;
