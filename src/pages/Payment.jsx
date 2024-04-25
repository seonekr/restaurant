import React, { useState } from "react";
import "./css/payment.css";
import { Link } from "react-router-dom";
import Menufooter from "../components/Menufooter";
import { IoIosArrowBack } from "react-icons/io";
import imagebcel from "../img/imagebcel.png";
import { IoMdCopy } from "react-icons/io";
import imageicon from "../img/imageicon.jpg";
import Alert from "../img/alert.png";

function Payment() {
  const [mainImageBanner, setMainImageBanner] = useState(null);
  const handleImageLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageBanner([file]);
      };

      reader.readAsDataURL(file);
    }
  };

  // const [products, setProducts] = useState([
  //   {
  //     mainImage: null,
  //     productName: "",
  //     price: "",
  //     popular: false,
  //   },
  // ]);
  // const handleImage = (e, index) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const updatedProducts = [...products];
  //       updatedProducts[index].mainImage = reader.result;
  //       setProducts(updatedProducts);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const [showPopup, setShowPopup] = useState(false);

  const togglePopupdialog = () => {
    setShowPopup(!showPopup);
  };

  const handleOK = () => {
    window.location.href = "/order";
  };
  return (
    <>
      <Menufooter />
      <div className="continer-payment">
        <div className="title_header_orderBox">
          <Link to="/" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3>Payment</h3>
        </div>
        <div className="Box-header-payment">
          <h4>+ Address</h4>
        </div>
        <Link to="/address">
          <div className="Box-continer-payment">
            <h4>Address:...</h4>
          </div>
        </Link>
        <div className="text-detail">
          <h4>Detail:</h4>
        </div>
        <div className="Box-continer-payment2">
          <div className="count_continer-payment2">
            <div className="count_box_item_payment">
              <p>Quantity:</p>
              <p>2</p>
            </div>
            <div className="count_box_item_payment">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="count_box_item_payment">
              <p>Total:</p>
              <p>240,000 KIP</p>
            </div>
          </div>
        </div>
        <div className="text-account">
          <div className="text_account_payment">
            <p>Please transfer money to this account</p>
          </div>
          <div className="text_account_payment_all">
            <img src={imagebcel} alt="" className="img-icon" />
            <div className="text_account_payment2">
              <p>Account number</p>
              <p>123456789</p>
            </div>
            <IoMdCopy className="icon_coppy" />
          </div>
          <p className="text-red">Please attach proof of money transfer!</p>
          <div className="Box-image">
            <div className="box_input_img">
              {mainImageBanner && mainImageBanner.length > 0 ? (
                <img src={URL.createObjectURL(mainImageBanner[0])} alt="img" />
              ) : (
                <img src={imageicon} alt="img" />
              )}
            </div>
            <label className="btn-image">
              <input type="file" id="img" onChange={handleImageLogo} required />

              <span>+ Image</span>
            </label>
          </div>
        </div>
        <div className="button-con-pay">
          <Link className="btn_confirm_payment" onClick={togglePopupdialog}>
            Confirm
          </Link>
        </div>
      </div>
      {showPopup && (
        <div className="background_popup_dialog">
          <div className="hover_popup_dialog">
            <div className="box_input_dialog">
              <img src={Alert} alt="logo"></img>
              <h3>Are you sure?</h3>
              <p>You want to order this</p>
            </div>
            <div className="btn_foasdf">
              <button
                className="btn_cancel btn_addproducttxt_popup"
                onClick={togglePopupdialog}
              >
                CANCEL
              </button>
              <button
                className="btn_confirm btn_addproducttxt_popup"
                onClick={handleOK}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Payment;
