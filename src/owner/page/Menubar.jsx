import React from 'react'
import "./css/menubar.css";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";

function Menubar() {
  return (
    <div>
      <div className="menubar_contentHeader">
        <div className="box_content_header2">
          <h3>Name Restaurant</h3>
          <div className='menu_header_box2'>
            <Link to="/" className='linkTomenu active'>Home</Link>
            <Link to="/manageorder" className='linkTomenu'>Order</Link>
            <Link to="/dashboardpc" className='linkTomenu'>Dashboard</Link>
          </div>
        </div>
      </div>


      
    </div>
  )
}

export default Menubar