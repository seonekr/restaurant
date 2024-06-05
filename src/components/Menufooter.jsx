import React, { useEffect, useState } from "react";
import "./css/menufooter.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LuClipboardCheck } from "react-icons/lu";
import {
  IoCartOutline,
  IoRestaurantOutline,
  IoCarSportSharp,
  IoStorefrontOutline,
} from "react-icons/io5";
import axios from "axios";
import { MdDashboardCustomize } from "react-icons/md";

function Menufooter() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const storage = JSON.parse(window.localStorage.getItem("user"));
  var store_id = false;
  if (localStorage.getItem("user")) {
    store_id = JSON.parse(window.localStorage.getItem("user")).store_id;
  }

  var is_admin = false;
  if (localStorage.getItem("user")) {
    is_admin = JSON.parse(window.localStorage.getItem("user")).is_admin;
  }
  console.log(user);
  return (
    <>
      <div className="menufooter_contentHeader">
        <div className="box_content_header">
          <Link to="/" className="linkTomenu">
            <h3>Name Restaurant</h3>
          </Link>

          <div className="menu_header_box">
            <NavLink to="/" className="linkTomenu">
              Home
            </NavLink>

            <NavLink to="/dashboard" className="boxcart_header_container">
              <div className="boxcart_header">
                <HiOutlineBuildingStorefront className="icon_cart_header" />
                Dashboard
              </div>
            </NavLink>
            <NavLink to="/counter" className="boxcart_header_container">
              <div className="boxcart_header">
                <MdDashboardCustomize className="icon_cart_header" />
                Dashboard
              </div>
            </NavLink>
            <NavLink to="/orderList" className="linkTomenu">
              Order
            </NavLink>
            <NavLink to="/cart" className="boxcart_header_container">
              <p className="linkTomenu">Cart</p>
            </NavLink>

            <NavLink to="/profile" className="linkTomenu">
              <FaRegUser id="FaRegUser" />
            </NavLink>

            {/* <NavLink to="/mainpage" className="boxcart_header_container">
                  <div className="boxcart_header">
                    <HiOutlineBuildingStorefront className="icon_cart_header" />
                  </div>
                </NavLink> */}

            {/* <NavLink to="/dashboard" className="boxcart_header_container">
                  <div className="boxcart_header">
                    <HiOutlineBuildingStorefront className="icon_cart_header" />
                  </div>
                </NavLink> */}

            <NavLink to="/logino" className="boxcart_header_container">
              Login
            </NavLink>
          </div>
        </div>
      </div>

      {/* <div className="menufooter_content_app">
        {store_id && (
          <>
            <NavLink className="link_menu" to="/">
              <IoStorefrontOutline className="iconMenu_foot" />
              Home
            </NavLink>

            <NavLink className="link_menu" to="/orderList">
              <LuClipboardCheck className="iconMenu_foot" />
              Order
            </NavLink>
            <NavLink className="link_menu" to="/cart">
              <IoCartOutline className="iconMenu_foot" />
              Cart
            </NavLink>
            <NavLink className="link_menu" to="/homepage2">
              <IoCarSportSharp className="iconMenu_foot" />
              Delivery
            </NavLink>
          </>
        )}
        {is_admin && (
          <NavLink className="link_menu" to="/mainpage">
            <IoRestaurantOutline className="iconMenu_foot" />
            Owner
          </NavLink>
        )}
      </div> */}
    </>
  );
}

export default Menufooter;
