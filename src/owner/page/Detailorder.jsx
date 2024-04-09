import React from "react";
import "./css/detailorder.css";
import Menufooter from "./Menubar";
import { Link } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import { LuChefHat } from "react-icons/lu";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

function Detailorder() {
  return (
    <div className="detailorder_box_container">
      <div className="detailorder_box_container">
        <div className="title_header_orderBox">
          <Link to="/manageorder" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3>Order</h3>
        </div>
        <div className="box_firstorder_content">
          <h4>Track your Order</h4>
          <div className="detailorder_status">
            <div className="name-textorder">
              <div className="numberIddetailorder">
                <p>No:1</p>
                <p>ID:1</p>
                <p>Name:1</p>
              </div>
              <div>
                <p>Table 1</p>
              </div>
            </div>
            <div className="boxstatus_detailorder">
              <div className="group-icon-order">
                <div className="icon_status-order iconactive">
                  <GrDocumentText />
                </div>
                <h4>Order</h4>
              </div>

              <div className="group-icon-cook">
                <div className="icon_status-order iconactive">
                  <LuChefHat />
                </div>
                <h4>Cooking</h4>
              </div>
              <div className="group-icon-done">
                <div className="icon_status-order ">
                  <BiSolidDish />
                </div>
                <h4>Done</h4>
              </div>
              <div className="spanboxinline-1"></div>
              <div className="spanboxinline-2"></div>
            </div>
            <p className="ssdasdsa">Your order has been received</p>
          </div>
        </div>
        <div className="order_content-detailorder">
          <h3>Menu</h3>
          <div className="order_content-Item">
            <div>
              <h4>Name</h4>
              <div className="box-Grouptxtintro box-ofnamefood">
                <p>Name...</p>
                <p>Name...</p>
                <p>Name...</p>
              </div>
            </div>
            <div>
              <h4>Price</h4>
              <div className="box-Grouptxtintro box-ofpricefood">
                <p>12,000</p>
                <p>12,000</p>
                <p>12,000</p>
              </div>
            </div>
            <div className="box-amount">
              <h4>Amount</h4>
              <div className="box-Grouptxtintro box-ofamountfood">
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </div>
            </div>
          </div>
          <div className="box-groupPrice">
            <h4>TOTAL:</h4>
            <h4>76,000</h4>
          </div>
          <div className="box-groupLastfoot">
            <p>Place on: 15/09/2023</p>
            <p>Payment method: MasterCard</p>
          </div>
        </div>
      </div>
      <div className="button-active">
        <div className="btn-pending">
          <Link to="/detailorder" className="btn-pending">
            Pending
          </Link>
        </div>
        <div className="btn-done">
          <Link to="/detailorder" className="btn-done">
            Done
          </Link>
        </div>
        <div className="btn-active">
          <Link to="/detailorder" className="btn-active">
            Active
          </Link>
        </div>
      </div>
      <Menufooter />
    </div>
  );
}

export default Detailorder;
