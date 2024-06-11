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
        <div className="headWithBox_search">
          <div className="head_box_logo">
            <Link to="/">
              <img src={restaurant} alt="Logo" />
            </Link>
          </div>

          <div className="Box_containner_form_search">
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
          </div>

          <div className="icon_account_login">
            <div>
              <Link to="#">Scan</Link>
            </div>

            <Link to="/logino">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
