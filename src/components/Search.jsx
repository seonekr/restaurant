import React from "react";
import "./css/search.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import restaurant from "../img/restaurant.jpg";

const Search = () => {
  return (
    <>
      <div className="navbar_header_search">
        <form>
          <div className="headWithBox_search">
            <div className="head_box_logo">
              <Link to="/">
                <img src={restaurant} alt="Logo" />
              </Link>
            </div>

            <div className="Box_containner_form_search">
              <input type="search" placeholder="Search..." />
              <button className="btn_submit">
                <FaMagnifyingGlass id="FaMagnifyingGlass"/>
              </button>
            </div>

            <div className="icon_account_login">
                <Link to="#">Scan</Link>

              <Link to="/logino">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
