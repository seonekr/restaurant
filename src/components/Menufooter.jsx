import React, { useState, useEffect } from "react";
import "./css/menufooter.css";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoCarSportSharp } from "react-icons/io5";
import foodImage from "../img/foodImage.png";

function Menufooter() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: foodImage,
      name: "Margherita Pizza",
      price: 10.99,
      count: 0, // Initial count for product 1
    },
    // Other product items...
  ]);

  const incrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product
      )
    );
  };
  return (
    <>
      <div className="menufooter_contentHeader">
        <div className="box_content_header">
          <Link to="/" className="linkTomenu ">
            <h3>Name Restaurant</h3>
          </Link>

          <div className="menu_header_box">
            <Link to="/" className="linkTomenu active">
              Home
            </Link>
            <Link to="/orderList" className="linkTomenu">
              Order
            </Link>
            <Link to="/cart" className="boxcart_header_container">
              
              <p className="linkTomenu">Cart</p>
              <div className="boxcart_header">
                <div className="box_border_haeaderCart boxfirstbg">
                  <IoCartOutline className="icon_cart_header" />
                </div>
                <div className="box_border_haeaderCart">
                <p>
        {products.reduce(
          (total, product) => total + product.count,
          0
        )}
      </p>
                </div>
              </div>
            </Link>

            <Link to="/mainpage" className="boxcart_header_container">
              <div className="boxcart_header">
                <IoRestaurantOutline className="icon_cart_header" />
              </div>
            </Link>
            <Link to="/homepage2" className="boxcart_header_container">
              Delivery
            </Link>
            <Link to="/logino" className="boxcart_header_container">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="menufooter_content_app">
        <Link className="link_menu active" to="/">
          <IoStorefrontOutline className="iconMenu_foot" />
          Home
        </Link>

        <Link className="link_menu" to="/orderList">
          <LuClipboardCheck className="iconMenu_foot" />
          Order
        </Link>
        <Link className="link_menu" to="/cart">
          <IoCartOutline className="iconMenu_foot" />
          Cart
        </Link>
        <Link className="link_menu" to="/mainpage">
          <IoRestaurantOutline className="iconMenu_foot" />
          Owner
        </Link>
        <Link className="link_menu" to="/homepage2">
          <IoCarSportSharp className="iconMenu_foot" />
          Delivery
        </Link>
      </div>
    </>
  );
}

export default Menufooter;
