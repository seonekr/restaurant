import React, { useState, useEffect } from "react";
import "./css/search.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import restaurant from "../img/restaurant.jpg";
import Logo1 from "../img/Logo1.png";
// import QRCode from "qrcode.react";
const Search = () => {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const handleScan = (data) => {
    if (data) {
      console.log("Scanned data:", data.text);
      setScanResult(data.text);
      window.location.href = data.text;
    }
  };

  const handleError = (err) => {
    console.error("Error during scan:", err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <>
      <div className="navbar_header_search">
        <form>
          <div className="headWithBox_search">
            <div className="head_box_logo">
              <Link to="/home">
                <img src={restaurant} alt="Logo" />
              </Link>
            </div>

            <div className="Box_containner_form_search">
              <input type="search" placeholder="Search..." />
              <button className="btn_submit">
                <FaMagnifyingGlass id="FaMagnifyingGlass" />
              </button>
            </div>

            <div className="icon_account_login">
              <Link to="/logino">Login</Link>
            </div>
          </div>
        </form>
        {showScanner && (
          <QrScanner
            delay={300}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        )}
      </div>
    </>
  );
};

export default Search;
