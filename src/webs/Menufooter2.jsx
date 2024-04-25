import React, { useState, useEffect } from "react";
import "./css/menufooter2.css";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoCarSportSharp } from "react-icons/io5";


function Menufooter() {
  

  return (
    <>
      <div className="menufooter_contentHeader">
        <div className="box_content_header">
          <Link to="/" className="linkTomenu ">
            <h3>Name Restaurant</h3>
          </Link>

          <div className="menu_header_box">
            

            <Link to="/homepage2" className="linkTomenu active">
              Home
            </Link>
            <Link to="/orderList2" className="linkTomenu">
              Order
            </Link>
            <Link to="/cart2" className="boxcart_header_container">
              <p className="linkTomenu">Cart</p>
              <div className="boxcart_header">
                <div className="box_border_haeaderCart boxfirstbg">
                  <IoCartOutline className="icon_cart_header" />
                </div>
                <div className="box_border_haeaderCart">
                  {/* <p>{totalCount}</p>  */}
                  <p>8</p>
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
          </div>
        </div>
      </div>

      <div className="menufooter_content_app">
        <Link className="link_menu active" to="/homepage2">
          <IoStorefrontOutline className="iconMenu_foot" />
          Home
        </Link>

        <Link className="link_menu" to="/orderList2">
          <LuClipboardCheck className="iconMenu_foot" />
          Order
        </Link>
        <Link className="link_menu" to="/cart2">
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
