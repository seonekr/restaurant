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
  var restaurant_id = false;
  if (localStorage.getItem("user")) {
    restaurant_id = JSON.parse(
      window.localStorage.getItem("user")
    ).restaurant_id;
  }

  var is_admin = false;
  if (localStorage.getItem("user")) {
    is_admin = JSON.parse(window.localStorage.getItem("user")).is_admin;
  }
  // console.log(user);
  return (
    <>
      <div className="menufooter_contentHeader">
        <div className="box_content_header">
          <div className="menu_header_box">
            <>
              {is_admin ? (
                <>
                  <NavLink to="/home" className="linkTomenu">
                    Home
                  </NavLink>
                  <NavLink to="/board" className="boxcart_header_container">
                    <div className="boxcart_header">
                      <HiOutlineBuildingStorefront className="icon_cart_header" />
                      Dashboard
                    </div>
                  </NavLink>
                </>
              ) : (
                // <>
                //   <NavLink to="/home" className="linkTomenu">
                //     Home
                //   </NavLink>
                //   <NavLink to="/order" className="linkTomenu">
                //     Order
                //   </NavLink>
                //   <NavLink to="/cart" className="boxcart_header_container">
                //     <p className="linkTomenu">Cart</p>
                //   </NavLink>
                //   <NavLink to="/logino" className="boxcart_header_container">
                //     Login
                //   </NavLink>
                // </>
                <>
                  {restaurant_id && (
                    <>
                      <NavLink to="/home" className="linkTomenu">
                        Home
                      </NavLink>
                      <NavLink to="/order" className="linkTomenu">
                        Order
                      </NavLink>
                      <NavLink to="/cart" className="boxcart_header_container">
                        <p className="linkTomenu">Cart</p>
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="boxcart_header_container"
                      >
                        <div className="boxcart_header">
                          <HiOutlineBuildingStorefront className="icon_cart_header" />
                          Dashboard
                        </div>
                      </NavLink>
                      <NavLink
                        to="/counter"
                        className="boxcart_header_container"
                      >
                        <div className="boxcart_header">
                          <MdDashboardCustomize className="icon_cart_header" />
                          Staff
                        </div>
                      </NavLink>
                    </>
                  )}
                </>
              )}
            </>

            <NavLink to="/profile" className="linkTomenu">
              <FaRegUser id="FaRegUser" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menufooter;
