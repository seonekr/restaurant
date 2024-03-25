import React from 'react'
import "./css/menufooter.css";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";

function Menufooter() {
  return (
    <div className="menufooter_container_box">
      <div className="menufooter_contentHeader">
        <div className="box_content_header">
          <h3>Name Restaurant</h3>
          <div className='menu_header_box'>
            <Link to="/" className='linkTomenu active'>Home</Link>
            <Link to="/orderList" className='linkTomenu'>Order</Link>
          </div>
          <Link to="/cart" className='boxcart_header_container'>
            <p className='linkTomenu'>Cart</p>
            <div className='boxcart_header'>
              <div className='box_border_haeaderCart boxfirstbg'>
                <IoCartOutline className='icon_cart_header' />
              </div>
              <div className='box_border_haeaderCart'>
                <p>2</p>
              </div>
            </div>
          </Link>
        </div>
      </div>


      <div className='menufooter_content'>
        <Link className="link_menu active" to="/">
          <IoStorefrontOutline className='iconMenu_foot' />
          Home
        </Link>

        <Link className="link_menu" to="/orderList">
          <LuClipboardCheck className='iconMenu_foot' />
          Order
        </Link>

        <Link className="link_menu" to="/cart">
          <IoCartOutline className='iconMenu_foot' />
          Cart
        </Link>
      </div>
    </div>
  )
}

export default Menufooter