import React from "react";
import "./css/signup1.css";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Menubar from "./Menubar";

const Signup1 = () => {
  return (
    <>
      <Menubar />
      <div className="container-signup1">
        <div className="title_header_orderBox">
          <Link to="/logino" className="back_orderBox">
            <MdArrowBack className="icon_closeReviwe" />
            Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup1;
