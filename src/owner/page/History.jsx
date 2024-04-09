import React from "react";
import Menufooter from "./Menubar";
import { Link } from "react-router-dom";
import "./css/history.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";

function History() {
  return (
    <div>
      <div className="history_box_container">
        <div className="title_header_orderBox">
          <Link to="/dashboardpc" className="back_orderBox">
            <IoIosArrowBack className="icon_closeReviwe" />
            Back
          </Link>
          <h3 className="txttitle_manageorder">History</h3>
        </div>
        <div className="history_container_box">
          <div className="history-visit">
            <div className="history">
              <div className="item_guopBox">
                <div className="items-his">
                  <h4>NO</h4>
                  <h4>Status</h4>
                  <h4>ID</h4>
                  <h4>Name</h4>
                  <h4>Time</h4>
                  <h4>total</h4>
                  <h4>Action</h4>
                </div>
                <div className="items-his">
                  <span>1</span>
                  <span className="p1">
                    <IoIosCheckmarkCircle className="icon_check" />
                    Done
                  </span>
                  <span>4</span>
                  <span>Username</span>
                  <span>11-3-2024 11:10:35</span>
                  <span>250,000 KIP</span>
                  <Link to="/orderhistory" className="btnView">
                    View
                  </Link>
                </div>
                <div className="items-his">
                  <span>2</span>
                  <span>
                    <IoIosCheckmarkCircle className="icon_check" />
                    Done
                  </span>
                  <span>5</span>
                  <span>Username</span>
                  <span>11-3-2024 11:10:35</span>
                  <span>400,000 KIP</span>
                  <Link to="/orderhistory" className="btnView">
                    View
                  </Link>
                </div>
                <div className="items-his">
                  <span>3</span>
                  <span>
                    <IoIosCheckmarkCircle className="icon_check" />
                    Done
                  </span>
                  <span>10</span>
                  <span>Username</span>
                  <span>11-3-2024 11:10:35</span>
                  <span>320,000 KIP</span>
                  <Link to="/orderhistory" className="btnView">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Menufooter />
    </div>
  );
}

export default History;
