import React from "react";
import Menufooter from "./Menubar";
import { Link } from "react-router-dom";
import "./css/manageorder.css";
import { IoIosArrowBack } from "react-icons/io";

const Manageorder = () => {
  return (
      <div className="manageorder_box_container">
        <div className="title_header_orderBox">
          <Link to="/mainpage" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3 className="txttitle_manageorder">Order</h3>
        </div>
        <div className="manageorder_container_box">
          <div className="box_content_manageorder">
            <div className="box_item_manageorder">
              <div className="box_txt_manageorder">
                <p className="txtname_manageorder">
                  Dreamland ordered the apple set x 24 pieces
                </p>
                <p className="txtDate_manageorder">2024.09.4.13:00</p>
              </div>
              <Link to="/detailorder" className="btnViewMoew_order">
                View
              </Link>
            </div>
          </div>
          <div className="box_content_manageorder">
            <div className="box_item_manageorder">
              <div className="box_txt_manageorder">
                <p className="txtname_manageorder">
                  Dreamland ordered the apple set x 2 pieces
                </p>
                <p className="txtDate_manageorder">2024.09.4.13:00</p>
              </div>
              <Link to="/detailorder" className="btnViewMoew_order">
                View
              </Link>
            </div>
          </div>
          <div className="box_content_manageorder">
            <div className="box_item_manageorder">
              <div className="box_txt_manageorder">
                <p className="txtname_manageorder">
                  Dreamland ordered the apple set x 4 pieces
                </p>
                <p className="txtDate_manageorder">2024.09.4.13:00</p>
              </div>
              <Link to="/detailorder" className="btnViewMoew_order">
                View
              </Link>
            </div>
          </div>
        </div>
        <Menufooter />
      </div>
  );
};

export default Manageorder;
