import React from 'react'
import "./css/menubar.css";
import { Link } from "react-router-dom";

function Menubar() {
  return (
    <div>
      <div className="menubar_contentHeader">
        <div className="box_content_header2">
        <Link to="/" className='linkTomenu '>
          <h3>Name Restaurant</h3>
        </Link>
          <div className='menu_header_box2'>
            <Link to="/mainpage" className='linkTomenu active'>Home</Link>
            <Link to="/manageorder" className='linkTomenu '>Order</Link>
            <Link to="/dashboardpc" className='linkTomenu'>Dashboard</Link>
          </div>
        </div>
      </div>


      
    </div>
  )
}

export default Menubar